pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Klona ditt GitHub-repo
                git url: 'https://github.com/salah-96/Quiz-App.git', branch: 'main'
            }
        }

        stage('Install Backend Dependencies') {
            steps {
                dir('backend') {
                    // Installera alla npm-paket för backend
                    sh 'npm install'
                }
            }
        }

        stage('Install Frontend Dependencies') {
            steps {
                dir('frontend') {
                    // Installera alla npm-paket för frontend
                    sh 'npm install'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    // Bygg frontend (t.ex. React)
                    sh 'npm run build'
                }
            }
        }

        stage('Run Backend') {
            steps {
                dir('backend') {
                    // Starta backend som använder MongoDB på localhost (ingen förändring i koden)
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
