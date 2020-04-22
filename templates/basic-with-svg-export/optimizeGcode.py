import sys

def main() :
    f = open( "D:/trashD/" + sys.argv[1], "r" )
    fout = open( "D:/trashD/ "+ "optimized-"+ sys.argv[1], "w+")
    lines = f.readlines()

    isFound = False

    # initialization auto home
    fout.write("G28 \n")
    # create a place where we put the pen at 0.5 height so that we can calibrate the pen
    fout.write("G1 Z5.5 F1200 S0 \n")
    fout.write("G1 X20.0 Y20.0 \n")
    fout.write("G1 Z0.5 F1200 S255 \n")
    fout.write("M18 \n")
    fout.write("M0 \n")
    fout.write("G1 Z5.5 F1200 S0 \n")
    fout.write("G28 \n")
    for line in lines:
        currentLine = line.strip()
        fout.write(currentLine + "\n")
        if(isFound == False):
            if ( currentLine.find("X") != -1 or currentLine.find("Y") != -1):
                print(currentLine)
                # M0 to wiat for insuer input
                fout.write("M0 \n")
                isFound = True

    fout.write("M18 \n")
    fout.close()
    f.close()


    

if __name__ == "__main__":
    main()
