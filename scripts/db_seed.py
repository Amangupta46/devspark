#!/usr/bin/env python
# scripts/db_seed.py
# Wrapper script to run database seeding in the backend container.

import subprocess
import sys

def run_seed():
    print("Running database seed...")
    try:
        subprocess.run([
            "docker", "compose", "-f", "docker-compose.prod.yml", 
            "exec", "backend", "python", "manage.py", "loaddata", "initial_data"
        ], check=True)
        print("Database seeded successfully.")
    except subprocess.CalledProcessError as e:
        print(f"Error seeding database: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    run_seed()
