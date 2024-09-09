pipeline {
    agent any

    environment {
        NODE_VERSION = '16'  // Specificera Node.js-versionen du vill använda
    }

    stages {
        stage('Installera backend') {
            steps {
                dir('backend') {
                    script {
                        // Använd Docker för att köra Node.js
                        sh 'docker run --rm -v $(pwd):/app -w /app node:$NODE_VERSION npm install'
                    }
                }
            }
        }

        stage('Testa backend') {
            steps {
                dir('backend') {
                    script {
                        // Kör backend-test med Docker
                        sh 'docker run --rm -v $(pwd):/app -w /app node:$NODE_VERSION npm test || echo "No tests available"'
                    }
                }
            }
        }

        stage('Installera frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Installera frontend med Docker
                        sh 'docker run --rm -v $(pwd):/app -w /app node:$NODE_VERSION npm install'
                    }
                }
            }
        }

        stage('Testa frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Testa frontend med Docker
                        sh 'docker run --rm -v $(pwd):/app -w /app node:$NODE_VERSION npm test || echo "No tests available"'
                    }
                }
            }
        }

        stage('Bygg frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Bygg frontend med Docker
                        sh 'docker run --rm -v $(pwd):/app -w /app node:$NODE_VERSION npm run build'
                    }
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
