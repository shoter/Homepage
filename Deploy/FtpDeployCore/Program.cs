using FluentFTP;
using FtpDeployCore.FtpDeploy;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Security;
using System.Security.Cryptography.X509Certificates;
using System.Threading;

namespace FtpDeployCore
{
    class Program
    {
        private static List<string> createdDirs = new List<string>();
        private static string buildFolder, login, password, folderName, rssFile;
        private static FtpClient client;

        static void Main(string[] args)
        {
            var config = new ConfigurationBuilder()
     .AddCommandLine(args)
     .Build();

            buildFolder = config["path"];
            login = config["login"];
            password = config["pass"];
            folderName = config["folder"];
            rssFile = config["rss"];


            if (buildFolder.EndsWith("/") == false)
                buildFolder += "/";

            Console.WriteLine($"Build folder - {buildFolder}");
            Console.WriteLine($"Login - {login}");
            Console.WriteLine($"Pass - {password}");
            Console.WriteLine($"Folder name - {folderName}");



            var files = GetFilesToDeploy(buildFolder);

            client = new FtpClient("damian.laczak.net.pl", 21, login, password);


            string basePath = "/damian.laczak.net.pl/wwwroot/Blog/";

            if (!string.IsNullOrWhiteSpace(folderName))
                basePath += folderName + "/";

            RemoveRecurse(basePath);

            byte[] content;

            foreach (var file in files)
            {
                string destinationPath = Path.Combine(basePath, file.RelativePath.OriginalString);

                content = File.ReadAllBytes(file.AbsolutePath.LocalPath);
                client.Upload(content, destinationPath, FtpExists.Overwrite, createRemoteDir: true);


                Console.WriteLine($"Uploaded {file.RelativePath.OriginalString}");
            }

            content = File.ReadAllBytes(rssFile);
             client.Upload(content, Path.Combine(basePath, "feed.xml"), FtpExists.Overwrite, createRemoteDir: true);
        }


        public static void RemoveRecurse(string dirPath)
        {
            if (client.DirectoryExists(dirPath) == false)
                return;

            var files = client.GetListing(dirPath);
            foreach (var file in files.ToList().Skip(2))
            {
                if (file.Type == FtpFileSystemObjectType.Directory)
                {
                    RemoveRecurse(file.FullName);
                    client.DeleteDirectory(file.FullName);
                }
                else
                {
                    client.DeleteFile(file.FullName);
                }

                Console.WriteLine($"Removed {file.FullName}");
            }
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
