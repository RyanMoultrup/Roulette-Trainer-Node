#!/bin/bash

# This script will generate a public and private keypair and save to current directory.
# Make sure to save the private key elsewhere after generated!

# Generate private key
openssl genpkey -algorithm RSA -out id_rsa_priv.pem -pkeyopt rsa_keygen_bits:4096

# Generate public key from the private key
openssl rsa -pubout -in id_rsa_priv.pem -out id_rsa_pub.pem

echo "Keys generated and saved to id_rsa_pub.pem and id_rsa_priv.pem"
