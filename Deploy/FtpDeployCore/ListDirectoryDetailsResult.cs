using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpDeployCore
{
    public class ListDirectoryDetailsResult
    {
        public bool IsDirectory { get; }
        public string FileName { get; }

        public ListDirectoryDetailsResult(string line)
        {
            IsDirectory = line.First() == 'd';
            FileName = line.Substring(55).Trim();
        }
    }
}
