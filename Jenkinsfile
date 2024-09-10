pipeline {
    agent {
        docker {
            image 'node:16' // Använder Node.js 16 som Docker-image
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Dela Docker-socket för att köra Docker inuti Docker
        }
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/salah-96/Quiz-App.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') { // Valfritt om du har några tester
            steps {
                sh 'npm test'
            }
        }

        stage('Run Application') {
            steps {
                sh 'npm start'
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
