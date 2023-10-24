def component = [
		Preprocess: false,
		Hyper: false,
		Train: false,
		Test: false,
		Bento: false
]
pipeline {
	agent any
	stages {
		stage("Checkout") {
			steps {
				checkout scm
			}
		}
		stage("Build and Push") {
			steps {
				withCredentials([[$class: 'UsernamePasswordMultiBinding',
								credentialsId: 'implude-docker',
								usernameVariable: 'DOCKER_USER_ID',
								passwordVariable: 'DOCKER_USER_PASSWORD'
				]]){
					sh 'docker login -u $DOCKER_USER_ID -p $DOCKER_USER_PASSWORD'
					sh 'docker buildx build --platform linux/amd64 --tag implude/voah-message-dev:$BUILD_NUMBER --push .'
					sh 'docker buildx build --platform linux/amd64 --tag implude/voah-message-dev:latest --push .'
				}	
			}
		}
    stage("SSH-Deploy") {
			steps {
				script {
					withCredentials([
						sshUserPrivateKey(credentialsId: 'debian-server', keyFileVariable: 'identity', passphraseVariable: '', usernameVariable: 'userName'),
					]) {
						sshagent (credentials: ['debian-server']) {
                			sh '''
								ssh -o StrictHostKeyChecking=no $userName@10.255.255.250 '
								cd /mnt/hdd/implude/voah/voah-message
                				docker compose pull
                				docker compose down
                                docker compose up -d
								'
							'''
						}
					}
				}
			}
		}
  	}
}