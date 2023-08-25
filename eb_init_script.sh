#!/bin/bash

# Fetch secrets from AWS Secrets Manager
secrets=$(aws secretsmanager get-secret-value --secret-id $SECRET_ID --query SecretString --output text)

# Parse the secrets to get private_key and public_key
private_key=$(echo $secrets | jq -r '.private_key')
public_key=$(echo $secrets | jq -r '.public_key')

# Create the .pem files
echo "$private_key" > /usr/src/app/dist/id_rsa_priv.pem
echo "$public_key" > /usr/src/app/dist/id_rsa_pub.pem
