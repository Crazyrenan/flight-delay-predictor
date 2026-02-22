from pydantic import BaseModel

class FlightInput(BaseModel):
    airline: str
    origin: str
    destination: str
    date: str
    time: str
