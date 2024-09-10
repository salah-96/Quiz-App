pipeline {
    agent {
        docker {
            image 'node:16' // Docker-image med Node.js 16
            args '-v /var/run/docker.sock:/var/run/docker.sock' // Dela Docker-socket om du behöver köra Docker inuti Docker
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
