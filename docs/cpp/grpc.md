---
title: grpc
lang: zh-CN
navbar: true
---
# grpc 通信

``` sh
.\vcpkg.exe install grpc:x64-windows-static #静态库
.\vcpkg.exe install grpc:x64-windows         #动态库
```
 

### vcpkg 安装

``` sh
.\vcpkg.exe install grpc:x64-windows-static #静态库
.\vcpkg.exe install grpc:x64-windows         #动态库
```

### 创建 proto 文件

``` proto3
syntax = "proto3";
// The greeting service definition.
service Greeter {
  // Sends a greeting
  rpc SayHello (HelloRequest) returns (HelloReply) {}
}

// The request message containing the user's name.
message HelloRequest {
  string name = 1;
}

// The response message containing the greetings
message HelloReply {
  string message = 1;
}
```

### 生成c++代码

``` powershell
C:\dev\lib\vcpkg\installed\x64-windows\tools\protobuf\protoc.exe --cpp_out=. --grpc_out=.  .\dwgtool.proto --plugin=protoc-gen-grpc=C:\dev\lib\vcpkg\installed\x64-windows\tools\grpc\grpc_cpp_plugin.exe
```

### 生成c#代码

``` powershell
C:\dev\lib\vcpkg\installed\x64-windows\tools\protobuf\protoc.exe --cpp_out=. --grpc_out=.  .\dwgtool.proto --plugin=protoc-gen-grpc=C:\dev\lib\vcpkg\installed\x64-windows\tools\grpc\grpc_csharp_plugin.exe
```

### c++服务端代码

```cpp
#include <iostream>
#include <memory>
#include <string>

#include <grpcpp/ext/proto_server_reflection_plugin.h>
#include <grpcpp/grpcpp.h>
#include <grpcpp/health_check_service_interface.h>

#include "grpc/dwgtool.grpc.pb.h"
using namespace grpc;
#pragma comment(lib,"ws2_32.lib")
class GreeterServiceImpl final : public Greeter::Service {
    Status SayHello(ServerContext* context, const HelloRequest* request,
        HelloReply* reply) override {
        // ...
        reply->set_message("dsadsa");
        return Status::OK;
    }
};

void RunServer() {
    std::string server_address("0.0.0.0:50051");
    GreeterServiceImpl service;

    ServerBuilder builder;
    // Listen on the given address without any authentication mechanism.
    builder.AddListeningPort(server_address, grpc::InsecureServerCredentials());
    // Register "service" as the instance through which we'll communicate with
    // clients. In this case it corresponds to an *synchronous* service.
    builder.RegisterService(&service);
    // Finally assemble the server.
    std::unique_ptr<Server> server(builder.BuildAndStart());
    std::cout << "Server listening on " << server_address << std::endl;

    // Wait for the server to shutdown. Note that some other thread must be
    // responsible for shutting down the server for this call to ever return.
    server->Wait();
}

int main()
{
    RunServer();
    std::cout << "Hello World!\n";
}
```

### c#客户端代码
### 安装包

``` powershell
Install-Package Grpc.Net.Client
Install-Package Google.Protobuf
Install-Package Grpc.Tools
```

``` csharp
using System.Threading.Tasks;

using Grpc.Net.Client;

// The port number must match the port of the gRPC server.
using var channel = GrpcChannel.ForAddress("http://localhost:50051");
var client = new Greeter.GreeterClient(channel);
var reply = client.SayHello(
                  new HelloRequest { Name = "GreeterClient" });
Console.WriteLine("Greeting: " + reply.Message);
Console.WriteLine("Press any key to exit...");
Console.ReadKey();
```
