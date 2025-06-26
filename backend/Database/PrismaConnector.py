import asyncio
import os
from datetime import datetime
from dotenv import load_dotenv

from prisma import Prisma

# Load environment variables from .env file
load_dotenv(os.path.join(os.path.dirname(__file__), '..', '.env'))


async def main() -> None:
    db = Prisma()
    await db.connect()

    # Create a unique email to avoid conflicts
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    unique_email = f"user_{timestamp}@email.com"
    
    user = await db.user.create({
        'email': unique_email,
        'username': f"user_{timestamp}",
    })
    print(f'created user: {user.model_dump_json(indent=2)}')

    found = await db.user.find_unique(where={'id': user.id})
    assert found is not None
    print(f'found user: {found.model_dump_json(indent=2)}')

    await db.disconnect()


if __name__ == '__main__':
    asyncio.run(main())