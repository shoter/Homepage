pipeline {
  agent any
  stages {
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
