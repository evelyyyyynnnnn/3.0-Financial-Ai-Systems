cmake_minimum_required(VERSION 3.16)
project(AlpacaTradingSystem VERSION 1.0.0 LANGUAGES CXX)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Set build type
if(NOT CMAKE_BUILD_TYPE)
    set(CMAKE_BUILD_TYPE Release)
endif()

# Compiler flags
set(CMAKE_CXX_FLAGS_DEBUG "-g -O0 -Wall -Wextra")
set(CMAKE_CXX_FLAGS_RELEASE "-O3 -DNDEBUG -Wall -Wextra")

# Find required packages
find_package(PkgConfig REQUIRED)
find_package(Threads REQUIRED)

# Find libcurl
find_package(CURL REQUIRED)

# Find OpenSSL (for HTTPS)
find_package(OpenSSL REQUIRED)

# Include directories
include_directories(${CMAKE_SOURCE_DIR})
include_directories(${CMAKE_SOURCE_DIR}/Algo-Trading)
include_directories(${CMAKE_SOURCE_DIR}/Algo-Trading/data-download)
include_directories(${CMAKE_SOURCE_DIR}/Algo-Trading/strategy)
include_directories(${CMAKE_SOURCE_DIR}/Algo-Trading/execution)
include_directories(${CMAKE_SOURCE_DIR}/Algo-Trading/performance)

# Third-party libraries
include(FetchContent)

# nlohmann/json
FetchContent_Declare(
    nlohmann_json
    GIT_REPOSITORY https://github.com/nlohmann/json.git
    GIT_TAG v3.11.2
)
FetchContent_MakeAvailable(nlohmann_json)

# websocketpp
FetchContent_Declare(
    websocketpp
    GIT_REPOSITORY https://github.com/zaphoyd/websocketpp.git
    GIT_TAG 0.8.2
)
FetchContent_MakeAvailable(websocketpp)

# Boost (for threading and other utilities)
find_package(Boost REQUIRED COMPONENTS system thread)

# Source files
set(SOURCES
    authentication.cpp
    Algo-Trading/data-download/historical_data.cpp
    Algo-Trading/data-download/websocket_client.cpp
    Algo-Trading/strategy/factor_strategy.cpp
    Algo-Trading/execution/order_executor.cpp
    Algo-Trading/performance/performance_monitor.cpp
    main.cpp
)

# Header files
set(HEADERS
    authentication.h
    Algo-Trading/data-download/historical_data.h
    Algo-Trading/data-download/websocket_client.h
    Algo-Trading/strategy/factor_strategy.h
    Algo-Trading/execution/order_executor.h
    Algo-Trading/performance/performance_monitor.h
)

# Create executable
add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})

# Link libraries
target_link_libraries(${PROJECT_NAME}
    ${CURL_LIBRARIES}
    ${OPENSSL_LIBRARIES}
    nlohmann_json::nlohmann_json
    Boost::system
    Boost::thread
    Threads::Threads
)

# Compiler-specific options
if(CMAKE_CXX_COMPILER_ID STREQUAL "GNU" OR CMAKE_CXX_COMPILER_ID STREQUAL "Clang")
    target_compile_options(${PROJECT_NAME} PRIVATE
        -Wall
        -Wextra
        -Wpedantic
        -Wno-unused-parameter
    )
endif()

# Set output directory
set_target_properties(${PROJECT_NAME} PROPERTIES
    RUNTIME_OUTPUT_DIRECTORY ${CMAKE_BINARY_DIR}/bin
)

# Installation
install(TARGETS ${PROJECT_NAME}
    RUNTIME DESTINATION bin
)

# Create a simple test
enable_testing()
add_test(NAME AlpacaTradingSystemTest COMMAND ${PROJECT_NAME} --test)

# Print configuration summary
message(STATUS "Build type: ${CMAKE_BUILD_TYPE}")
message(STATUS "C++ standard: ${CMAKE_CXX_STANDARD}")
message(STATUS "Compiler: ${CMAKE_CXX_COMPILER_ID}")
message(STATUS "Install prefix: ${CMAKE_INSTALL_PREFIX}")
