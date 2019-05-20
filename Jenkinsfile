pipeline {
  agent any
  stages {
  stage('prepare') {
    parallel  {
      stage('Prepare React') {
        steps {
        powershell("Deploy/Prepare-react.ps1")
        }
      }

      stage('Prepare Csharp') {
        steps {
        powershell("Deploy/Prepare-csharp.ps1")
        }
      }
    }
  }

  stage('Run Tests') {
    parallel {
      stage('Run CSharp Tests') {
        steps {
          powershell("Deploy/Test-csharp.ps1")
        }
      }
      stage('Run React Tests') {
        steps {
          powershell("Deploy/Test-react.ps1")
        }
      }
    }
  }

  stage("Deploy") {
     environment { 
                FTP = credentials('	WebioFtp') 
            }
    steps {
      script {
      def msg = powershell(returnStdout: true, script: 'Deploy/Deploy.ps1')
      println msg
      }
    }
  }
}
}
