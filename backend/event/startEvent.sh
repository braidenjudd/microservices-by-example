# Kill all the processes
while read line           
do           
    kill -9 $line 
done <PID

# Clear the PIDs
> PID

# Get a list of services
services=$(ls . | grep .js)

# Start all the services
for service in $services; do
    node $service &
    echo $! >> PID
done