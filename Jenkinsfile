pipeline {
    agent {
        docker { 
            image 'node:16'  // Använd en officiell Node.js Docker-image
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // Om du behöver Docker-in-Docker
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
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('backend') {
                    sh 'npm start &'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution completed!'
        }
        success {
            echo 'Build succeeded!'
        }
        failure {
            echo 'Build failed!'
        }
    }
}
