from datetime import datetime

class FeedHealthMonitor:
    def __init__(self, db=None):
        self.db = db
        self.failure_counters = {
            "transit": 0
        }

    def evaluate_feed(self, feed_name, status, error=None):
        if status == "OFFLINE":
            self.failure_counters[feed_name] += 1
            if self.failure_counters[feed_name] == 3:
                self.trigger_circuit_breaker(feed_name, error)
        else:
            self.failure_counters[feed_name] = 0

    def trigger_circuit_breaker(self, feed_name, error):
        print(f"⚠️ CIRCUIT BREAKER ENGAGED for {feed_name}: {error}")
        
        degradation_event = {
            "phase": "PHASE 1",
            "title": f"Circuit Breaker Socket Isolation: {feed_name}",
            "status": "COMPLETED",
            "time": datetime.utcnow().strftime("%H:%M:%S IST"),
            "detail": f"Detected 3 consecutive {error} timeouts from {feed_name} server. Automated circuit breaker isolated feed to prevent blocking the ingestion pipeline."
        }
        
        # In a real system we might push this to a 'degradation_logs' collection
        if self.db:
            self.db.degradation.insert_one(degradation_event)
