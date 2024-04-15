# Text_Analysis_System
Requirements:
1. Docker Desktop installed
2. Minikube installed
How to run it?
-> Start the service-container "minikube" at  Docker Desktop.
-> Run 'minikube start' command at powershell command line.
-> Run 'kubectl apply -f kubernetes_file.yaml' in terminal.
-> Run 'kubectl apply -f kubernetes_for_py_services_check.yaml' in terminal.
-> Run 'minikube service my-manager-check' at powershell command line.
-> Run 'minikube service my-manager-js-services' at powershell command line.
-> Anytime check kubectl get pods at terminal to see that running.