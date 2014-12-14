# Kill all the processes
while read line           
do           
    kill -9 $line 
done <PID

> PID