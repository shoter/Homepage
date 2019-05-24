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
        private static string buildFolder, login, password, folderName;
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


            if (buildFolder.EndsWith("/") == false)
                buildFolder += "/";

            Console.WriteLine($"Build folder - {buildFolder}");
            Console.WriteLine($"Login - {login}");
            Console.WriteLine($"Pass - {password}");



            var files = GetFilesToDeploy(buildFolder);

            client = new FtpClient("sociatis.net", 21, login, password);


            string basePath = "/damian.laczak.net.pl/wwwroot/Blog/";

            if (string.IsNullOrWhiteSpace(folderName))
                basePath += folderName + "/";

            RemoveRecurse(basePath);

            foreach (var file in files)
            {
                string destinationPath = Path.Combine(basePath, file.RelativePath.OriginalString);

                var content = File.ReadAllBytes(file.AbsolutePath.LocalPath);
                client.Upload(content, destinationPath, FtpExists.Overwrite, createRemoteDir: true);


                Console.WriteLine($"Uploaded {file.RelativePath.OriginalString}");
            }
        }


        public static void RemoveRecurse(string dirPath)
        {

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
