pipeline {
    agent {
        docker {
            image 'node:16'  // Docker-image med Node.js
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // För Docker-in-Docker
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/salah-96/Quiz-App.git', branch: 'main'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'CI=false npm run build'  // Använder CI=false för att ignorera varningar
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}
