#!/bin/sh

echo "Running migrations..."
npx prisma migrate deploy

echo "Starting server..."
exec node dist/index.js
