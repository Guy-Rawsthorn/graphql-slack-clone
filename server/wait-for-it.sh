#!/bin/sh

set -e

host="$1"

until PGPASSWORD=$POSTGRES_PASSWORD psql -h "$host" -U "postgres" -p 5432 -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
