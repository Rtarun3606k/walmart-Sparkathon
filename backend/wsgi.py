from app import app
import asyncio

if __name__ == "__main__":
    asyncio.run(app.run(debug=True))
    # app.run(debug=True)