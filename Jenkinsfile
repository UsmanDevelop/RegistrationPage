pipeline {
    agent any
    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'master', url: "https://github.com/UsmanDevelop/RegistrationPage.git"
            }
        }
        stage('Build Docker Image and Run Container') {
              steps {
                sh 'docker build -t register .'
                sh 'docker run -d -p 3000:3000 register'
              }
        }
    }
}
