#!/bin/bash

# Alpaca High-Frequency Trading System Build Script
# This script automates the build process for the C++ trading system

set -e  # Exit on any error

echo "=== Alpaca High-Frequency Trading System Build Script ==="
echo "Version: 1.0.0"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in the right directory
if [ ! -f "CMakeLists.txt" ]; then
    print_error "CMakeLists.txt not found. Please run this script from the C++ directory."
    exit 1
fi

# Detect operating system
OS="unknown"
if [[ "$OSTYPE" == "linux-gnu"* ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    OS="windows"
fi

print_status "Detected operating system: $OS"

# Check for required tools
check_dependencies() {
    print_status "Checking dependencies..."
    
    local missing_deps=()
    
    # Check CMake
    if ! command -v cmake &> /dev/null; then
        missing_deps+=("cmake")
    else
        CMAKE_VERSION=$(cmake --version | head -n1 | cut -d' ' -f3)
        print_status "CMake version: $CMAKE_VERSION"
    fi
    
    # Check make
    if ! command -v make &> /dev/null; then
        missing_deps+=("make")
    fi
    
    # Check compiler
    if command -v g++ &> /dev/null; then
        GCC_VERSION=$(g++ --version | head -n1)
        print_status "GCC version: $GCC_VERSION"
    elif command -v clang++ &> /dev/null; then
        CLANG_VERSION=$(clang++ --version | head -n1)
        print_status "Clang version: $CLANG_VERSION"
    else
        missing_deps+=("g++ or clang++")
    fi
    
    # Check for curl development headers
    if [[ "$OS" == "linux" ]]; then
        if ! pkg-config --exists libcurl; then
            missing_deps+=("libcurl4-openssl-dev")
        fi
    elif [[ "$OS" == "macos" ]]; then
        if ! brew list curl &> /dev/null; then
            missing_deps+=("curl")
        fi
    fi
    
    # Check for OpenSSL
    if [[ "$OS" == "linux" ]]; then
        if ! pkg-config --exists openssl; then
            missing_deps+=("libssl-dev")
        fi
    elif [[ "$OS" == "macos" ]]; then
        if ! brew list openssl &> /dev/null; then
            missing_deps+=("openssl")
        fi
    fi
    
    # Check for Boost
    if [[ "$OS" == "linux" ]]; then
        if ! pkg-config --exists boost; then
            missing_deps+=("libboost-all-dev")
        fi
    elif [[ "$OS" == "macos" ]]; then
        if ! brew list boost &> /dev/null; then
            missing_deps+=("boost")
        fi
    fi
    
    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing dependencies: ${missing_deps[*]}"
        print_status "Please install missing dependencies:"
        
        if [[ "$OS" == "linux" ]]; then
            print_status "Ubuntu/Debian: sudo apt-get install ${missing_deps[*]}"
        elif [[ "$OS" == "macos" ]]; then
            print_status "macOS: brew install ${missing_deps[*]}"
        fi
        
        exit 1
    fi
    
    print_success "All dependencies found"
}

# Install dependencies (optional)
install_dependencies() {
    if [[ "$1" == "--install-deps" ]]; then
        print_status "Installing dependencies..."
        
        if [[ "$OS" == "linux" ]]; then
            sudo apt-get update
            sudo apt-get install -y build-essential cmake libcurl4-openssl-dev libssl-dev libboost-all-dev
        elif [[ "$OS" == "macos" ]]; then
            if ! command -v brew &> /dev/null; then
                print_error "Homebrew not found. Please install Homebrew first."
                exit 1
            fi
            brew install cmake curl openssl boost
        fi
        
        print_success "Dependencies installed"
    fi
}

# Clean build directory
clean_build() {
    if [[ "$1" == "--clean" ]]; then
        print_status "Cleaning build directory..."
        rm -rf build
        print_success "Build directory cleaned"
    fi
}

# Create build directory
create_build_dir() {
    print_status "Creating build directory..."
    mkdir -p build
    cd build
    print_success "Build directory created"
}

# Configure with CMake
configure_cmake() {
    print_status "Configuring with CMake..."
    
    local cmake_args=()
    
    # Set build type
    if [[ "$1" == "--debug" ]]; then
        cmake_args+=("-DCMAKE_BUILD_TYPE=Debug")
        print_status "Building in Debug mode"
    else
        cmake_args+=("-DCMAKE_BUILD_TYPE=Release")
        print_status "Building in Release mode"
    fi
    
    # Set install prefix
    cmake_args+=("-DCMAKE_INSTALL_PREFIX=/usr/local")
    
    # Run CMake
    cmake "${cmake_args[@]}" ..
    
    print_success "CMake configuration complete"
}

# Build the project
build_project() {
    print_status "Building project..."
    
    # Get number of CPU cores
    local cores=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo 4)
    print_status "Using $cores parallel jobs"
    
    # Build
    make -j$cores
    
    print_success "Build complete"
}

# Run tests
run_tests() {
    if [[ "$1" == "--test" ]]; then
        print_status "Running tests..."
        
        if [ -f "./bin/AlpacaTradingSystem" ]; then
            ./bin/AlpacaTradingSystem --test
            print_success "Tests passed"
        else
            print_warning "Executable not found, skipping tests"
        fi
    fi
}

# Install the project
install_project() {
    if [[ "$1" == "--install" ]]; then
        print_status "Installing project..."
        make install
        print_success "Project installed"
    fi
}

# Show usage information
show_usage() {
    echo "Usage: $0 [options]"
    echo ""
    echo "Options:"
    echo "  --clean              Clean build directory before building"
    echo "  --debug              Build in Debug mode (default: Release)"
    echo "  --test               Run tests after building"
    echo "  --install             Install the project after building"
    echo "  --install-deps        Install system dependencies"
    echo "  --help               Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                    # Build in Release mode"
    echo "  $0 --debug            # Build in Debug mode"
    echo "  $0 --clean --test     # Clean, build, and test"
    echo "  $0 --install-deps     # Install dependencies and build"
}

# Main execution
main() {
    # Parse command line arguments
    local clean=false
    local debug=false
    local test=false
    local install=false
    local install_deps=false
    
    while [[ $# -gt 0 ]]; do
        case $1 in
            --clean)
                clean=true
                shift
                ;;
            --debug)
                debug=true
                shift
                ;;
            --test)
                test=true
                shift
                ;;
            --install)
                install=true
                shift
                ;;
            --install-deps)
                install_deps=true
                shift
                ;;
            --help)
                show_usage
                exit 0
                ;;
            *)
                print_error "Unknown option: $1"
                show_usage
                exit 1
                ;;
        esac
    done
    
    # Execute build steps
    install_dependencies $([ "$install_deps" = true ] && echo "--install-deps")
    check_dependencies
    clean_build $([ "$clean" = true ] && echo "--clean")
    create_build_dir
    configure_cmake $([ "$debug" = true ] && echo "--debug")
    build_project
    run_tests $([ "$test" = true ] && echo "--test")
    install_project $([ "$install" = true ] && echo "--install")
    
    print_success "Build process completed successfully!"
    echo ""
    print_status "Executable location: build/bin/AlpacaTradingSystem"
    print_status "To run:"
    print_status "  ./build/bin/AlpacaTradingSystem --backtest    # Run backtest"
    print_status "  ./build/bin/AlpacaTradingSystem --live         # Run live trading"
    print_status "  ./build/bin/AlpacaTradingSystem --help        # Show help"
}

# Run main function with all arguments
main "$@"
