pipeline {
    agent {
        docker {
            image 'node:20'  // Update to Node.js 20
            args '-v /var/run/docker.sock:/var/run/docker.sock'  // For Docker-in-Docker
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

       

        // Run frontend tests
        stage('Run Frontend Tests') {
            steps {
                dir('frontend') {
                    sh 'npm test'  // Kör tester för frontend
                }
            }
        }

        // Security audit for backend
        stage('Security Audit Backend') {
            steps {
                dir('backend') {
                    sh 'npm audit'  // Säkerhetskontroll för backend
                }
            }
        }

        // Security audit for frontend
        stage('Security Audit Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm audit'  // Säkerhetskontroll för frontend
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'CI=false npm run build'  // Using CI=false to avoid treating warnings as errors
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
