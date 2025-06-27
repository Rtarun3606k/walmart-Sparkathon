from app import app
import asyncio

if __name__ == "__main__":
    asyncio.run(app.run(debug=True,host='0.0.0.0', port=5000))
    # app.run(debug=True)