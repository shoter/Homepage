using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FtpDeployCore
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Text;
    using System.Threading.Tasks;

    namespace FtpDeploy
    {
        public struct DeployFile
        {
            public Uri RelativePath;

            public Uri AbsolutePath;

            public DeployFile(string absolutePath, string pathToWhichShouldBeRelative)
            {
                this.AbsolutePath = new Uri(absolutePath);

                this.RelativePath = new Uri(pathToWhichShouldBeRelative).MakeRelativeUri(this.AbsolutePath);
            }

            public override string ToString() => $"[{RelativePath}] - {AbsolutePath}";

        }
    }

}
