from pydantic import BaseModel

class PricePredictionRequest(BaseModel):
    airline: str
    origin: str
    destination: str
    duration_mins: int
