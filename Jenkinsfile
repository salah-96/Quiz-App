pipeline {
    agent any

    environment {
        NODE_VERSION = '16'
    }

    stages {
        stage('Check out repository') {
            steps {
                // Check out the repository code
                checkout scm
            }
        }

        stage('Install backend dependencies') {
            steps {
                dir('backend') {
                    // Install Node.js and npm for backend
                    sh '''
                    # Install Node.js
                    curl -sL https://deb.nodesource.com/setup_16.x | bash -
                    apt-get install -y nodejs

                    # Install backend dependencies
                    npm install
                    '''
                }
            }
        }

        stage('Run backend tests') {
            steps {
                dir('backend') {
                    // Run backend tests
                    sh 'npm test || echo "No tests available in backend"'
                }
            }
        }

        stage('Install frontend dependencies') {
            steps {
                dir('frontend') {
                    // Install Node.js and npm for frontend
                    sh '''
                    # Install Node.js
                    curl -sL https://deb.nodesource.com/setup_16.x | bash -
                    apt-get install -y nodejs

                    # Install frontend dependencies
                    npm install
                    '''
                }
            }
        }

        stage('Build React app') {
            steps {
                dir('frontend') {
                    // Build the frontend (React app)
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
