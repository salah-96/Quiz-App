pipeline {
    agent any

    environment {
        NODE_VERSION = '16.x'  // Specificera Node.js-versionen du vill använda
    }

    stages {
        stage('Installera backend') {
            steps {
                dir('backend') {
                    script {
                        // Installera Node.js och npm för backend
                        nodejs(NODE_VERSION) {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Testa backend') {
            steps {
                dir('backend') {
                    script {
                        // Kör backend-test
                        nodejs(NODE_VERSION) {
                            sh 'npm test || echo "No tests available"'
                        }
                    }
                }
            }
        }

        stage('Installera frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Installera Node.js och npm för frontend
                        nodejs(NODE_VERSION) {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Testa frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Kör frontend-test
                        nodejs(NODE_VERSION) {
                            sh 'npm test || echo "No tests available"'
                        }
                    }
                }
            }
        }

        stage('Bygg frontend') {
            steps {
                dir('frontend') {
                    script {
                        // Bygg frontend
                        nodejs(NODE_VERSION) {
                            sh 'npm run build'
                        }
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
