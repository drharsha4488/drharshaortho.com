#!/bin/bash
# Spot-check regional + metro programmatic slugs for unexpected 404s
B=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d= -f2)
CITIES="warangal nizamabad karimnagar khammam mahbubnagar nalgonda siddipet suryapet adilabad vijayawada visakhapatnam guntur nellore kurnool rajahmundry kakinada tirupati anantapur kadapa ongole"
FAIL=0
for c in $CITIES; do
  for s in "best-knee-replacement-in-$c" "cost-of-hip-replacement-in-$c" "robotic-knee-replacement-in-$c" "knee-arthritis-treatment-in-$c" "rotator-cuff-tear-treatment-in-$c"; do
    code=$(curl -s -o /dev/null -w '%{http_code}' "$B/$s")
    if [ "$code" != "200" ]; then echo "FAIL $code $s"; FAIL=$((FAIL+1)); fi
  done
done
echo "Total failures: $FAIL"
