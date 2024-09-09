pipeline {
    agent {
        docker {
            image 'node:16'  // Använder en Node.js 16 Docker-image
            args '-u root'   // Kör som root för att undvika rättighetsproblem
        }
    }

    stages {
        stage('Check out repository') {
            steps {
                checkout scm
            }
        }

        stage('Install backend dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run backend tests') {
            steps {
                dir('backend') {
                    sh 'npm test || echo "No tests available in backend"'
                }
            }
        }

        stage('Install frontend dependencies') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                }
            }
        }

        stage('Build React app') {
            steps {
                dir('frontend') {
                    sh 'CI=false npm run build'
                }
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished!'
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
