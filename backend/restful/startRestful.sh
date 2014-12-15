# Recreate Logfile
> LOG
touch LOG

# Kill all the processes
while read line           
do
	if ps -p $line > /dev/null; then
    	kill -9 $line
	fi
done <PID

# Clear the PIDs
> PID

# Get a list of services
services=$(ls . | grep .js)

# Start all the services
for service in $services; do
    node $service &> LOG &
    echo $! >> PID
    sleep 1
done

echo "Booted"