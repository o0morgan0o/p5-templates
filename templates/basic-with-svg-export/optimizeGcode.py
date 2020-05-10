import sys
import os

minX = 60
maxX= 278
minY=7.99
maxY=300
maxZ = 10


isXYline = False


def main() :
    currentX =-1
    currentY = -1
    prevX = -1
    prevY = -1
    virtualZ= 0

    f = open( os.getcwd() + "/" + sys.argv[1], "r" )
    fout = open( os.getcwd() + "/"+ sys.argv[1]+ "-cutted.gcode", "w+")
    lines = f.readlines()

    isFound = False
    initializationFinished = False
    prevLine = ""
    isOutside = False
    prevIsOutside = False
    line_num =0

    for i in range(0,15):
        # we want to find the first value of Z which is the choosen high value on Z axis
        highZindex = lines[i].find("Z")
        if(highZindex != -1):
            maxZ = round(float(lines[i][highZindex+1:].split(" ")[0]),2)
            print("\nfound maximum Z : ", maxZ)
            break

    print( f"Default limits will be x[{minX}, {maxX}], y[{minY}, {maxY}], z[{maxZ}] \n")
    print(f"Starting to parse {len(lines)} lines of gcode ... Please wait ...")

    for line in lines:
        line_num+=1
        currentLine = line.strip()
        if(currentLine == prevLine): continue

        zindex = currentLine.find("Z")
        if(zindex != -1):
            virtualZ = float(currentLine[zindex+1:].split(" ")[0])



        if(currentLine.find(";end of initialization") != -1 and initializationFinished == False):
            fout.write(currentLine + "\n")
            initializationFinished = True
            prevLine = currentLine
            continue

        
        
        if(initializationFinished == False):
            fout.write(currentLine + "\n")
            prevLine = currentLine
            continue
        
        
        # get values
        if(currentLine.find("X") != -1 and currentLine.find("Y") != -1):
            values = getXYvalues(currentLine)
            currentX = values[0]
            currentY = values[1]

        if(prevLine.find("X") != -1 and prevLine.find("Y") != -1):
            values = getXYvalues(prevLine)
            prevX = values[0]
            prevY = values[1]


        # check if current and prev are inside or outside
        currentOutside = checkOutside(currentX, currentY)
        prevOutside = checkOutside(prevX, prevY)


        # if everything is inside we don't do anything
        if(currentOutside == False and prevOutside == False):
            fout.write(currentLine + "\n")




        if(currentOutside == True and prevOutside == False):
            fout.write( "; going outside \n")
            lineEq = calculateEqOfLine(prevX, prevY, currentX, currentY)
            # we are going outside we must calculate the point of intersection
            intersectPt=getIntersectionPoint(currentX, currentY, lineEq)

            # we check if point is valid and redo the interpolation if not
            if (intersectPt[0] < minX or intersectPt[0] > maxX or intersectPt[1] < minY or intersectPt[1] > maxY ):
                print("point non valide doing new intersect on ", intersectPt)
                intersectPt=getIntersectionPoint(intersectPt[0], intersectPt[1], lineEq)
                print(intersectPt)

            print(f"[->] Going outside at line {line_num}, from {prevX, prevY}, to { currentX, currentY },  intersect is : ", intersectPt)
            fout.write( "G0 X" + str(round(intersectPt[0],2)) + " Y"+ str(round(intersectPt[1],2)) + "; added Point\n")
            fout.write("G1 Z"+ str(maxZ) + "\n")
        


        if(currentOutside == False and prevOutside == True):
        # we are coming from outside we must calculate the point of intersection
            lineEq = calculateEqOfLine(prevX, prevY, currentX, currentY)
            fout.write("; comming from outside \n")
            intersectPt=getIntersectionPoint(prevX, prevY, lineEq)

            # we check if point is valid and redo the interpolation if not
            if (intersectPt[0] < minX or intersectPt[0] > maxX or intersectPt[1] < minY or intersectPt[1] > maxY ):
                print("point non valide doing new intersect on ", intersectPt)
                intersectPt=getIntersectionPoint(intersectPt[0], intersectPt[1], lineEq)
                print(intersectPt)

            print(f"[<-] Coming from outside at line {line_num}, from {prevX, prevY}, to {currentX, currentY}, intersect is : ", intersectPt)
            fout.write( "G0 X" + str(round(intersectPt[0],2)) + " Y"+ str(round(intersectPt[1],2)) + "; added Point\n")
            fout.write("G1 Z" + str(virtualZ)+ "; added Z \n")
            fout.write(currentLine + "\n")

        prevLine = currentLine


    fout.write("G1 Z"+ str(maxZ) + "\n")

    fout.close()
    f.close()

    fout = open( os.getcwd() + "/"+ sys.argv[1]+ "-cutted.gcode", "rb")
    linesOut =fout.readlines()
    print(f"[+] Finished, Final file is {len(linesOut)} long.")

    if(initializationFinished == False):
       print( "no initialization found !! Check settings in illustrator script.") 





def getIntersectionPoint(pointX, pointY, lineEq):
    intersectPt=[]
    global minX
    global maxX
    global minY
    global maxY
    if(pointX < minX): 
        intersectX = minX
        intersectY = lineEq[0] * intersectX + lineEq[1]
        intersectPt=[intersectX,intersectY]

    elif(pointX > maxX): 
        intersectX=maxX
        intersectY = lineEq[0] * intersectX + lineEq[1]
        intersectPt=[intersectX,intersectY]

    elif(pointY < minY): 
        intersectY=minY
        intersectX=(intersectY- lineEq[1])/lineEq[0]
        intersectPt=[intersectX,intersectY]

    elif(pointY > maxY):
        intersectY=maxY
        intersectX=(intersectY- lineEq[1])/lineEq[0]
        intersectPt=[intersectX,intersectY]

    return intersectPt


def getXYvalues(currentLine):
    xindex = currentLine.find("X")
    yindex = currentLine.find("Y")
    x = float(currentLine[xindex+1:].split(' ')[0])
    y = float(currentLine[yindex+1:].split(' ')[0])
    return [x,y]


def checkOutside(x,y):
    return (x < minX or x > maxX or y < minY or y > maxY)

def calculateEqOfLine(xA, yA, xB, yB):
    # calcul of slope
    # cas particulier
    if(xB == xA): p = 99999 
    else:
        p = (yB - yA) / (xB -xA)
    b = yA - p * xA 
    return [p,b]

if __name__ == "__main__":
    main()
