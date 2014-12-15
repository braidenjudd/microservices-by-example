# Kill all the processes
while read line           
do
	if ps -p $line > /dev/null; then
    	kill -9 $line
	fi
done <PID

> PID