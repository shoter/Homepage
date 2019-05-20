pipeline {
  agent any
  stages {
  stage('prepare') {
    parallel  {
      stage('React') {
        powershell("Deploy/Prepare-react.ps1")
      }

      stage('Csharp') {
        powershell("Deploy/Prepare-csharp.ps1")
      }
    }
  }
  stage('Tests') {
      steps {
          powershell("Deploy/Tests.ps1")
      }
    }
  stage('Stage 2') {
      steps {
        script {
          echo 'Stage 2'
        }
      }
    }
  }
}
