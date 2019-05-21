using FtpDeployCore.FtpDeploy;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading;

namespace FtpDeployCore
{
    class Program
    {
        private static List<string> createdDirs = new List<string>();
        private static string buildFolder, login, password;
        static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
     .AddCommandLine(args)
     .Build();

            buildFolder = config["path"];
            login = config["login"];
            password = config["pass"];

            Console.WriteLine($"Build folder - {buildFolder}");
            Console.WriteLine($"Login - {login}");
            Console.WriteLine($"Pass - {password}");

            var files = GetFilesToDeploy(buildFolder);

            System.Net.HttpWebRequest.DefaultWebProxy = null;

            ServicePointManager.ServerCertificateValidationCallback =
            delegate (
                object s,
                X509Certificate certificate,
                X509Chain chain,
                SslPolicyErrors sslPolicyErrors
            )
            {
                // The certificate will point on *.webio.pl
                // I have domain in damian.laczak.net.pl
                // I need to contact support to ask if I can do something about that.
                return sslPolicyErrors == SslPolicyErrors.RemoteCertificateNameMismatch;

            };

            //DirectoryExists(@"ftp://sociatis.net:21/damian.laczak.net.pl/wwwroot/Blog/");
            //DirectoryExists(@"ftp://sociatis.net:21/damian.laczak.net.pl/wwwroot/Blog/test/");

            string basePath = "ftp://sociatis.net:21/damian.laczak.net.pl/wwwroot/Blog/";

            RemoveRecurse(basePath);

            foreach (var file in files)
            {
                string sourcePath = file.AbsolutePath.AbsolutePath;
                string destinationPath = Path.Combine(basePath, file.RelativePath.OriginalString);

                CreateDirectories(basePath, file.RelativePath.OriginalString);

                var ftp = CreateRequestBase(destinationPath, WebRequestMethods.Ftp.UploadFile);

                var content = File.ReadAllBytes(file.AbsolutePath.LocalPath);

                ftp.ContentLength = content.Length;

                using (var rs = ftp.GetRequestStream())
                    rs.Write(content, 0, content.Length);

                Console.WriteLine($"Uploaded {file.RelativePath.OriginalString}");
            }
        }


        public static FtpWebRequest CreateRequestBase(string path, string method)
        {
            var ftp = (FtpWebRequest)FtpWebRequest.Create(path);

            ftp.EnableSsl = true;
            ftp.Method = method;
            ftp.Proxy = null;
            ftp.Credentials = new NetworkCredential(login, password);
            ftp.UseBinary = true;
            ftp.UsePassive = true;
            ftp.ReadWriteTimeout = 1000;

            return ftp;
        }

        public static string GetUriparent(string path)
        {
            return new Uri(path + "..").AbsoluteUri;
        }

        public static bool DirectoryExists(string path)
        {
            var uriPath = new Uri(path);
            var subDirectory = GetUriparent(path);

            var ftp = CreateRequestBase(subDirectory, WebRequestMethods.Ftp.ListDirectoryDetails);

            MemoryStream ms = new MemoryStream();

            List<string> lines = new List<string>();

            using (var rs = ftp.GetResponse())
            {
                using (var stream = rs.GetResponseStream())
                {
                    var buffer = new byte[1024];
                    long totalBytesRead = 0;
                    int bytesRead;
                    stream.ReadTimeout = 500;

                    do
                    {
                        var readTask = stream.ReadAsync(buffer, 0, buffer.Length);

                        Thread.Sleep(500);

                        if (readTask.IsCompleted)
                        {
                            bytesRead = readTask.Result;
                            totalBytesRead += bytesRead;
                            ms.Write(buffer, 0, bytesRead);
                        }
                        else
                            bytesRead = 0;
                    } while (bytesRead > 0);
                }
            }

            ms.Position = 0;



            using (var sr = new StreamReader(ms))
                while (sr.EndOfStream == false)
                {
                    var detail = new ListDirectoryDetailsResult(sr.ReadLine());

                    if (detail.IsDirectory == false)
                        continue;

                    var uriDetail = new Uri(subDirectory + detail.FileName + "/");

                    if (uriDetail == uriPath)
                    {
                        return true;
                    }
                }

            return false;
        }

        public static void CreateDirectories(string basePath, string relativePath)
        {
            string[] directories = relativePath.Split('/');
            bool isLastDirectory = relativePath.EndsWith("/");

            string relativeDirectoryPath = "";

            for (int i = 0; i < directories.Length - (isLastDirectory ? 0 : 1); ++i)
            {
                relativeDirectoryPath += directories[i] + "/";
                string dirPath = basePath + relativeDirectoryPath;

                if (createdDirs.Contains(dirPath))
                    continue;

                if (DirectoryExists(dirPath) == false)
                {
                    CreateDirectory(dirPath);

                    createdDirs.Add(dirPath);
                }

            }
        }

        public static void Remove(string path, bool isDirectory)
        {
            var ftp = CreateRequestBase(path, isDirectory ? WebRequestMethods.Ftp.RemoveDirectory : WebRequestMethods.Ftp.DeleteFile);

            using (var response = (FtpWebResponse)ftp.GetResponse())
            {
                Debug.WriteLine(response.StatusCode);
            }

            Console.WriteLine("Removed " + path);
        }

        public static void RemoveRecurse(string dirPath)
        {
            var ftp = CreateRequestBase(dirPath, WebRequestMethods.Ftp.ListDirectoryDetails);

            MemoryStream ms = new MemoryStream();

            List<string> lines = new List<string>();

            using (var rs = ftp.GetResponse())
            {
                using (var stream = rs.GetResponseStream())
                {
                    var buffer = new byte[1024];
                    long totalBytesRead = 0;
                    int bytesRead;
                    stream.ReadTimeout = 500;

                    do
                    {
                        var readTask = stream.ReadAsync(buffer, 0, buffer.Length);

                        Thread.Sleep(500);

                        if (readTask.IsCompleted)
                        {
                            bytesRead = readTask.Result;
                            totalBytesRead += bytesRead;
                            ms.Write(buffer, 0, bytesRead);
                        }
                        else
                            bytesRead = 0;
                    } while (bytesRead > 0);
                }
            }

            ms.Position = 0;



            using (var sr = new StreamReader(ms))
                while (sr.EndOfStream == false)
                {
                    var detail = new ListDirectoryDetailsResult(sr.ReadLine());


                    if (detail.FileName == "." || detail.FileName == "..")
                        continue;

                    if (detail.IsDirectory)
                    {
                        RemoveRecurse(dirPath + detail.FileName + "/");
                        Remove(dirPath + detail.FileName + "/", true);
                    }
                    else
                        Remove(dirPath + detail.FileName, false);
                }
        }

        public static void CreateDirectory(string dirPath)
        {
            var ftp = CreateRequestBase(dirPath, WebRequestMethods.Ftp.MakeDirectory);

            using (var rs = (FtpWebResponse)ftp.GetResponse())
            {
                Debug.WriteLine(rs.StatusCode);
            }

            Console.WriteLine("Created directory " + dirPath);
        }

        public static void RemoveRecursive(string path)
        {

        }


        public static DeployFile[] GetFilesToDeploy(string path)
        {
            path = new Uri(path).LocalPath; //normalize path

            var files = Directory.GetFiles(path, "*", SearchOption.AllDirectories);
            var deployFiles = new DeployFile[files.Length];


            for (int i = 0; i < files.Length; ++i)
            {
                deployFiles[i] = new DeployFile(files[i], path);
            }

            return deployFiles;
        }
    }
}
