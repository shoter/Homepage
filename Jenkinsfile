pipeline {
  agent any
  stages {
  stage('Tests') {
      steps {
        script {
            powershell -File Deploy/Tests.ps1
        }
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
