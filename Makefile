URL=http://localhost:8080/api/payments
JSON={"CardNumber": "0000000000000000", "ExpDate": "04/2022", "Cvv": "123", "Amount": 100}

01_build:
	docker-compose build
02_up:
	docker-compose up
03_api_check:
	curl -X POST $(URL) -H 'Content-Type: application/json' -d '$(JSON)'
04_collection_check:
	curl $(URL)