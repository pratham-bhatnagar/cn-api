const express = require("express");

// Create an instance of express
const app = express();

app.get('/', (req, res) => {
    // Return a JSON string as a response
    res.send(`TCP CLIENT SERVER 
    Server: tcpserver.c
    #include<sys/types.h>
    #include<sys/socket.h>
    #include<netinet/in.h>
    #include<netdb.h>
    #include<arpa/inet.h>
    #include<string.h>
    #include<string.h>
    #include<stdio.h>
    int main(int asrgc,char*argv[])
    {
    
    int bd,sd,ad;
    char buff[1024];
    struct sockaddr_in cliaddr,servaddr;
    socklen_t clilen;
    clilen=sizeof(cliaddr);
    bzero(&servaddr,sizeof(servaddr));
    
    /*Socket address structure*/
    
    servaddr.sin_family=AF_INET;
    servaddr.sin_addr.s_addr=htonl(INADDR_ANY);
    servaddr.sin_port=htons(1999);
    /*TCP socket is created, an Internet socket address structure is filled with wildcard address &
    server’s well known port*/
    sd=socket(AF_INET,SOCK_STREAM,0);
    
    /*Bind function assigns a local protocol address to the socket*/
    bd=bind(sd,(struct sockaddr*)&servaddr,sizeof(servaddr));
    /*Listen function specifies the maximum number of connections that kernel should queue for
    this socket*/
    listen(sd,5);
    printf("Server is running....\n");
    
    /*The server to return the next completed connection from the front of the
    completed connection Queue calls it*/
    
    ad=accept(sd,(struct sockaddr*)&cliaddr,&clilen);
    while(1)
    {
    bzero(&buff,sizeof(buff));
    
    /*Receiving the request message from the client*/
    recv(ad,buff,sizeof(buff),0);
    printf("Message received is %s\n",buff);
    }
    }
    Client: tcpclient.c
    #include<stdio.h>
    #include<string.h>
    #include<sys/socket.h>
    #include<sys/types.h>
    #include<unistd.h>
    #include<netinet/in.h>
    #include<netdb.h>
    #include<arpa/inet.h>
    int main(int argc,char * argv[])
    {
    int cd,sd,ad;
    char buff[1024];
    struct sockaddr_in cliaddr,servaddr;
    struct hostent *h;
    /*This function looks up a hostname and it returns a pointer to a hostent
    structure that contains all the IPV4 address*/
    
    h=gethostbyname(argv[1]);
    bzero(&servaddr,sizeof(servaddr));
    /*Socket address structure*/
    servaddr.sin_family=AF_INET;
    memcpy((char *)&servaddr.sin_addr.s_addr,h->h_addr_list[0],h->h_length);
    servaddr.sin_port = htons(1999);
    
    /*Creating a socket, assigning IP address and port number for that socket*/
    
    sd = socket(AF_INET,SOCK_STREAM,0);
    
    /*Connect establishes connection with the server using server IP address*/
    cd=connect(sd,(struct sockaddr*)&servaddr,sizeof(servaddr));
    while(1)
    {
    printf("Enter the message: \n");
    /*Reads the message from standard input*/
    fgets(buff,100,stdin);
    
    /*Send function is used on client side to send data given by user on client
    side to the server*/
    
    send(sd,buff,sizeof(buff)+1,0);
    printf("\n Data Sent ");
    //recv(sd,buff,strlen(buff)+1,0);
    printf("%s",buff);
    }
    
    }
    
    
    UDP ECHO CLIENT SERVER COMMUNICATION
    
    Server:
    #include<sys/socket.h>
    #include<stdio.h>
    #include<unistd.h>
    #include<string.h>
    #include<netinet/in.h>
    #include<netdb.h>
    #include<arpa/inet.h>
    #include<sys/types.h>
    int main(int argc,char *argv[])
    {
    int sd;
    
    char buff[1024];
    struct sockaddr_in cliaddr,servaddr;
    socklen_t clilen;
    clilen=sizeof(cliaddr);
    /*UDP socket is created, an Internet socket address structure is filled with wildcard
    address & server’s well known port*/
    sd=socket(AF_INET,SOCK_DGRAM,0);
    if (sd<0)
    {
    perror ("Cannot open Socket");
    exit(1);
    }
    bzero(&servaddr,sizeof(servaddr));
    /*Socket address structure*/
    servaddr.sin_family=AF_INET;
    servaddr.sin_addr.s_addr=htonl(INADDR_ANY);
    servaddr.sin_port=htons(5669);
    
    /*Bind function assigns a local protocol address to the socket*/
    if(bind(sd,(struct sockaddr*)&servaddr,sizeof(servaddr))<0)
    {
    perror("error in binding the port");
    exit(1);
    }
    printf("%s","Server is Running...\n");
    while(1)
    {
    bzero(&buff,sizeof(buff));
    
    /*Read the message from the client*/
    
    if(recvfrom(sd,buff,sizeof(buff),0,(struct sockaddr*)&cliaddr,&clilen)<0)
    {
    perror("Cannot rec data");
    exit(1);
    }
    printf("Message is received \n",buff);
    /*Sendto function is used to echo the message from server to client side*/
    if(sendto(sd,buff,sizeof(buff),0,(struct sockadddr*)&cliaddr,clilen)<0)
    {
    perror("Cannot send data to client");
    exit(1);
    
    }
    printf("Send data to UDP Client: %s",buff);
    }
    cloSe(sd);
    return 0;
    }
    
    Client:
    #include<sys/types.h>
    #include<sys/socket.h>
    #include<stdio.h>
    #include<unistd.h>
    #include<string.h>
    #include<netinet/in.h>
    #include<netdb.h>
    int main(int argc,char*argv[])
    {
    int sd;
    char buff[1024];
    struct sockaddr_in servaddr;
    socklen_t len;
    len=sizeof(servaddr);
    
    /*UDP socket is created, an Internet socket address structure is filled with
    wildcard address & server’s well known port*/
    sd = socket(AF_INET,SOCK_DGRAM,0);
    if(sd<0)
    {
    perror("Cannot open socket");
    exit(1);
    }
    bzero(&servaddr,len);
    /*Socket address structure*/
    servaddr.sin_family=AF_INET;
    servaddr.sin_addr.s_addr=htonl(INADDR_ANY);
    servaddr.sin_port=htons(5669);
    while(1)
    {
    printf("Enter Input data : \n");
    bzero(buff,sizeof(buff));
    
    /*Reads the message from standard input*/
    
    fgets(buff,sizeof (buff),stdin);
    
    /*sendto is used to transmit the request message to the server*/
    if(sendto (sd,buff,sizeof (buff),0,(struct sockaddr*)&servaddr,len)<0)
    {
    perror("Cannot send data");
    exit(1);
    }
    printf("Data sent to UDP Server:%s",buff);
    bzero(buff,sizeof(buff));
    /*Receiving the echoed message from server*/
    if(recvfrom (sd,buff,sizeof(buff),0,(struct sockaddr*)&servaddr,&len)<0)
    {
    perror("Cannot receive data");
    exit(1);
    }
    
    printf("Received Data from server: %s",buff);
    }
    close(sd);
    return 0;
    }
    
    CONCURRENT TCP/IP DAY-TIME SERVER
    
    
    Server:
    #include<netinet/in.h>
    #include<sys/socket.h>
    #include<stdio.h>
    #include<string.h>
    #include<time.h>
    #include<stdlib.h>
    int main()
    {
    struct sockaddr_in sa;
    struct sockaddr_in cli;
    
    int sockfd,conntfd;
    int len,ch;
    char str[100];
    time_t tick;
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0)
    {
    printf("error in socket\n");
    exit(0);
    }
    else
    printf("Socket opened");
    bzero(&sa,sizeof(sa));
    sa.sin_port=htons(5600);
    sa.sin_addr.s_addr=htonl(0);
    if(bind(sockfd,(struct sockaddr*)&sa,sizeof(sa))<0)
    {
    printf("Error in binding\n");
    }
    else
    printf("Binded Successfully");
    listen(sockfd,50);
    for(;;)
    {
    len=sizeof(ch);
    conntfd=accept(sockfd,(struct sockaddr*)&cli,&len);
    printf("Accepted");
    tick=time(NULL);
    snprintf(str,sizeof(str),"%s",ctime(&tick));
    printf("%s",str);write(conntfd,str,100);
    }
    }
    Client:
    #include <netinet/in.h>
    #include <sys/socket.h>
    #include <stdio.h>
    #include <stdlib.h>
    int main()
    {
    struct sockaddr_in sa,cli;
    int n,sockfd;
    int len;char buff[100];
    sockfd=socket(AF_INET,SOCK_STREAM,0);
    if(sockfd<0)
    {
    
    printf("\nError in Socket");
    
    exit(0);
    }
    else
    printf("\nSocket is Opened");
    bzero(&sa,sizeof(sa));
    sa.sin_family=AF_INET;
    sa.sin_port=htons(5600);
    if(connect(sockfd,(struct sockaddr*)&sa,sizeof(sa))<0)
    {
    printf("\nError in connection failed");
    exit(0);
    }
    else
    printf("\nconnected successfully");
    if(n=read(sockfd,buff,sizeof(buff))<0)
    {
    printf("\nError in Reading");
    exit(0);
    }
    else
    {
    printf("\nMessage Read %s",buff);
    }
    }
    
    
    HALF DUPLEX CHAT USING TCP/IP
    
    Server:
    #include "stdio.h"
    #include "stdlib.h"
    #include "string.h"
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <netinet/in.h>
    #include <unistd.h>
    #include "netdb.h"
    #include "arpa/inet.h"
    
    #define MAX 1000
    #define BACKLOG 5
    int main()
    {
    char serverMessage[MAX];
    char clientMessage[MAX];
    
    int socketDescriptor = socket(AF_INET, SOCK_STREAM, 0);
    
    struct sockaddr_inserverAddress;
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_port = htons(5214);
    serverAddress.sin_addr.s_addr = INADDR_ANY;
    bind(socketDescriptor, (struct sockaddr*)&serverAddress, sizeof(serverAddress));
    listen(socketDescriptor, BACKLOG);
    
    int clientSocketDescriptor = accept(socketDescriptor, NULL, NULL);
    while (1)
    {
    
    printf("\ntext message here .. :");
    scanf("%s", serverMessage);
    send(clientSocketDescriptor, serverMessage, sizeof(serverMessage) , 0);
    recv(clientSocketDescriptor, &clientMessage, sizeof(clientMessage), 0) ;
    printf("\nCLIENT: %s", clientMessage);
    
    }
    close(socketDescriptor);
    return 0;
    }
    Client:
    #include "stdio.h"
    #include "stdlib.h"
    #include "string.h"
    #include <sys/types.h>
    #include <sys/socket.h>
    include <netinet/in.h>
    #include <unistd.h>
    #include "netdb.h"
    #include "arpa/inet.h"
    #define h_addrh_addr_list[0]
    #define PORT 5214
    #define MAX 1000
    int main(){
    char clientResponse[MAX];
    int socketDescriptor = socket(AF_INET, SOCK_STREAM, 0);
    char hostname[MAX], ipaddress[MAX];
    struct hostent *hostIP;
    f(gethostname(hostname,sizeof(hostname))==0){
    hostIP = gethostbyname(hostname);
    }
    else{
    printf("ERROR:FCC4539 IP Address Not ");
    }
    struct sockaddr_inserverAddress;
    serverAddress.sin_family = AF_INET;
    
    serverAddress.sin_port = htons(PORT);
    serverAddress.sin_addr.s_addr = INADDR_ANY;
    connect(socketDescriptor, (struct sockaddr *)&serverAddress, sizeof(serverAddress));
    printf("\nLocalhost: %s\n", inet_ntoa(*(struct in_addr*)hostIP->h_addr));
    printf("Local Port: %d\n", PORT);
    printf("Remote Host: %s\n", inet_ntoa(serverAddress.sin_addr));
    while (1)
    {
    
    recv(socketDescriptor, serverResponse, sizeof(serverResponse), 0);
    printf("\nSERVER : %s", serverResponse);
    printf("\ntext message here... :");
    scanf("%s", clientResponse);
    send(socketDescriptor, clientResponse, sizeof(clientResponse), 0);
    
    }
    close(socketDescriptor);
    return 0;
    }
    
    
    FULL DUPLEX CHAT USING TCP/IP
    
    Server:
    #include<sys/types.h>
    #include<sys/socket.h>
    #include<stdio.h>
    #include<unistd.h>
    #include<netdb.h>
    #include<arpa/inet.h>
    #include<netinet/in.h>
    #include<string.h>
    
    int main(int argc,char *argv[])
    {
    int clientSocketDescriptor,socketDescriptor;
    struct sockaddr_inserverAddress,clientAddress;
    socklen_tclientLength;
    char recvBuffer[8000],sendBuffer[8000];
    pid_tcpid;
    bzero(&serverAddress,sizeof(serverAddress));
    /*Socket address structure*/
    serverAddress.sin_family=AF_INET;
    serverAddress.sin_addr.s_addr=htonl(INADDR_ANY);
    serverAddress.sin_port=htons(9652);
    /*TCP socket is created, an Internet socket address structure is filled with
    wildcard address & server’s well known port*/
    socketDescriptor=socket(AF_INET,SOCK_STREAM,0);
    /*Bind function assigns a local protocol address to the socket*/
    bind(socketDescriptor,(struct sockaddr*)&serverAddress,sizeof(serverAddress));
    /*Listen function specifies the maximum number of connections that kernel should queue
    for this socket*/
    listen(socketDescriptor,5);
    printf("%s\n","Server is running ...");
    /*The server to return the next completed connection from the front of the
    completed connection Queue calls it*/
    clientSocketDescriptor=accept(socketDescriptor,(struct
    sockaddr*)&clientAddress,&clientLength);
    /*Fork system call is used to create a new process*/
    cpid=fork();
    if(cpid==0)
    {
    while(1)
    {
    bzero(&recvBuffer,sizeof(recvBuffer));
    /*Receiving the request from client*/
    recv(clientSocketDescriptor,recvBuffer,sizeof(recvBuffer),0);
    printf("\nCLIENT : %s\n",recvBuffer);
    }
    }
    else
    {
    while(1)
    {
    bzero(&sendBuffer,sizeof(sendBuffer));
    printf("\nType a message here ... ");
    /*Read the message from client*/
    
    fgets(sendBuffer,80000,stdin);
    /*Sends the message to client*/
    send(clientSocketDescriptor,sendBuffer,strlen(sendBuffer)+1,0);
    printf("\nMessage sent !\n");
    }
    }
    return 0;
    }
    Client:
    
    #include "stdio.h"
    #include "stdlib.h"
    #include "string.h"
    //headers for socket and related functions
    #include <sys/types.h>
    #include <sys/socket.h>
    //for including structures which will store information needed
    #include <netinet/in.h>
    #include <unistd.h>
    //for gethostbyname
    #include "netdb.h"
    #include "arpa/inet.h"
    int main()
    {
    int socketDescriptor;
    struct sockaddr_inserverAddress;
    char sendBuffer[8000],recvBuffer[8000];
    pid_tcpid;
    bzero(&serverAddress,sizeof(serverAddress));
    serverAddress.sin_family=AF_INET;
    serverAddress.sin_addr.s_addr=inet_addr("127.0.0.1");
    serverAddress.sin_port=htons(9652);
    /*Creating a socket, assigning IP address and port number for that socket*/
    socketDescriptor=socket(AF_INET,SOCK_STREAM,0);
    /*Connect establishes connection with the server using server IP address*/
    connect(socketDescriptor,(struct sockaddr*)&serverAddress,sizeof(serverAddress));
    /*Fork is used to create a new process*/
    cpid=fork();
    if(cpid==0)
    {
    while(1)
    {
    bzero(&sendBuffer,sizeof(sendBuffer));
    printf("\nType a message here ... ");
    /*This function is used to read from server*/
    fgets(sendBuffer,80000,stdin);
    
    /*Send the message to server*/
    send(socketDescriptor,sendBuffer,strlen(sendBuffer)+1,0);
    printf("\nMessage sent !\n");
    
    }
    }
    else
    {
    while(1)
    {
    bzero(&recvBuffer,sizeof(recvBuffer));
    /*Receive the message from server*/
    recv(socketDescriptor,recvBuffer,sizeof(recvBuffer),0);
    printf("\nSERVER : %s\n",recvBuffer);
    }
    }
    return 0;
    }
    
    
    
    IMPLEMENTATION OF FILE TRANSFER PROTOCOL
    
    Server:
    #include "stdio.h"
    #include "stdlib.h"
    #include "string.h"
    //headers for socket and related functions
    #include <sys/types.h>
    
    #include <sys/socket.h>
    #include <sys/stat.h>
    //for including structures which will store information needed
    #include <netinet/in.h>
    #include <unistd.h>
    //for gethostbyname
    #include "netdb.h"
    #include "arpa/inet.h"
    // defining constants
    #define PORT 6969
    #define BACKLOG 5
    int main()
    {
    int size;
    int socketDescriptor = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in serverAddress, clientAddress;
    socklen_t clientLength;
    struct stat statVariable;
    char buffer[100], file[1000];
    FILE *filePointer;
    bzero(&serverAddress, sizeof(serverAddress));
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = htonl(INADDR_ANY);
    
    serverAddress.sin_port = htons(PORT);
    
    bind(socketDescriptor, (struct sockaddr *)&serverAddress, sizeof(serverAddress));
    
    listen(socketDescriptor,BACKLOG);
    printf("%s\n","Server is running ...");
    int clientDescriptor = accept(socketDescriptor,(struct
    sockaddr*)&clientAddress,&clientLength);
    
    while(1){
    bzero(buffer,sizeof(buffer));
    bzero(file,sizeof(file));
    
    recv(clientDescriptor,buffer,sizeof(buffer),0);
    filePointer = fopen(buffer,"r");
    stat(buffer,&statVariable);
    size=statVariable.st_size;
    fread(file,sizeof(file),1,filePointer);
    send(clientDescriptor,file,sizeof(file),0);
    }
    return 0;
    }
    Client:
    #include "stdio.h"
    #include "stdlib.h"
    #include "string.h"
    
    //headers for socket and related functions
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <sys/stat.h>
    //for including structures which will store information needed
    #include <netinet/in.h>
    #include <unistd.h>
    //for gethostbyname
    #include "netdb.h"
    #include "arpa/inet.h"
    // defining constants
    #define PORT 6969
    int main()
    {
    int serverDescriptor = socket(AF_INET, SOCK_STREAM, 0);
    struct sockaddr_in serverAddress;
    char buffer[100], file[1000];
    bzero(&serverAddress, sizeof(serverAddress));
    erverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = inet_addr("127.0.0.1");
    
    serverAddress.sin_port = htons(PORT);
    connect(serverDescriptor,(struct sockaddr*)&serverAddress,sizeof(serverAddress));
    while (1){
    printf("File name : ");
    scanf("%s",buffer);
    send(serverDescriptor,buffer,strlen(buffer)+1,0);
    printf("%s\n","File Output : ");
    recv(serverDescriptor,&file,sizeof(file),0);
    
    printf("%s",file);
    
    }
    return 0;
    }
    
    
    
    
    REMOTE COMMAND EXECUTION USING UDP
    
    
    Server:
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <stdio.h>
    #include <stdlib.h>
    #include <netdb.h>
    #include <netinet/in.h>
    #include <string.h>
    #include <sys/stat.h>
    #include <arpa/inet.h>
    #include <unistd.h>
    #define MAX 1000
    int main()
    {
    int serverDescriptor = socket(AF_INET, SOCK_DGRAM, 0);
    int size;
    char buffer[MAX], message[] = "Command Successfully executed !";
    struct sockaddr_in clientAddress, serverAddress;
    socklen_t clientLength = sizeof(clientAddress);
    bzero(&serverAddress, sizeof(serverAddress));
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = htonl(INADDR_ANY);
    serverAddress.sin_port = htons(8079);
    bind(serverDescriptor, (struct sockaddr *)&serverAddress, sizeof(serverAddress));
    while (1)
    {
    bzero(buffer, sizeof(buffer));
    
    recvfrom(serverDescriptor, buffer, sizeof(buffer), 0, (struct sockaddr *)&clientAddress,
    &clientLength);
    system(buffer);
    printf("Command Executed ... %s ", buffer);
    
    sendto(serverDescriptor, message, sizeof(message), 0, (struct sockaddr *)&clientAddress,
    clientLength);
    
    }
    close(serverDescriptor);
    return 0;
    }
    Client:
    #include <sys/types.h>
    #include <sys/socket.h>
    #include <stdio.h>
    #include <unistd.h>
    
    #include <netdb.h>
    #include <netinet/in.h>
    #include <string.h>
    #include <arpa/inet.h>
    #define MAX 1000
    int main()
    {
    int serverDescriptor = socket(AF_INET, SOCK_DGRAM, 0);
    char buffer[MAX], message[MAX];
    struct sockaddr_in cliaddr, serverAddress;
    socklen_t serverLength = sizeof(serverAddress);
    bzero(&serverAddress, sizeof(serverAddress));
    serverAddress.sin_family = AF_INET;
    serverAddress.sin_addr.s_addr = inet_addr("127.0.0.1");
    serverAddress.sin_port = htons(8079);
    
    bind(serverDescriptor, (struct sockaddr *)&serverAddress, sizeof(serverAddress));
    
    while (1)
    {
    printf("\nCOMMAND FOR EXECUTION ... ");
    fgets(buffer, sizeof(buffer), stdin);
    sendto(serverDescriptor, buffer, sizeof(buffer), 0, (struct sockaddr *)&serverAddress,
    serverLength);
    printf("\nData Sent !");
    recvfrom(serverDescriptor, message, sizeof(message), 0, (struct sockaddr
    *)&serverAddress, &serverLength);
    printf("UDP SERVER : %s", message);
    }
    return 0;
    }
    
    
    ARP IMPLEMENTATION USING UDP
    
    
    #include<sys/types.h>
    #include<sys/socket.h>
    #include<net/if_arp.h>
    #include<sys/ioctl.h>
    #include<stdio.h>
    #include<string.h>
    #include<unistd.h>
    #include<math.h>
    #include<complex.h>
    #include<arpa/inet.h>
    #include<netinet/in.h>
    #include<netinet/if_ether.h>
    #include<net/ethernet.h>
    #include<stdlib.h>
    int main()
    {
    struct sockaddr_in sin={0};
    struct arpreq myarp={{0}};
    unsigned char *ptr;
    int sd;
    sin.sin_family=AF_INET;
    printf("Enter IP address: ");
    char ip[20];
    scanf("%s", ip);
    
    if(inet_pton(AF_INET,ip,&sin.sin_addr)==0)
    {
    printf("IP address Entered '%s' is not valid \n",ip);
    exit(0);
    }
    memcpy(&myarp.arp_pa,&sin,sizeof(myarp.arp_pa));
    strcpy(myarp.arp_dev,"echo");
    d=socket(AF_INET,SOCK_DGRAM,0);
    printf("\nSend ARP request\n");
    if(ioctl(sd,SIOCGARP,&myarp)==1)
    {
    printf("No Entry in ARP cache for '%s'\n",ip);
    exit(0);
    }
    ptr=&myarp.arp_pa.sa_data[0];
    printf("Received ARP Reply\n");
    printf("\nMAC Address for '%s' : ",ip);
    printf("%p:%p:%p:%p:%p:%p\n",ptr,(ptr+1),(ptr+2),(ptr+3),(ptr+4),(ptr+5));
    return 0;
    }
    
    
    `);

  });


// Set up the server to listen on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
