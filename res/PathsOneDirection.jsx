aDoc = app.activeDocument;
aPaths = aDoc.pathItems;
nPaths = aPaths.length;

firstItem = 1;
dirAng = 0;

for(i=0; i<nPaths; i++)
{
	cItem = aPaths[i];

    if(!cItem.selected)
        continue;
        
    point_1 = cItem.pathPoints[0].anchor;
    point_2 = cItem.pathPoints[cItem.pathPoints.length - 1].anchor;
    currAng = Math.atan2(point_2[1]-point_1[1], point_2[0]-point_1[0]);
    
    if(firstItem)
    {
        firstItem = 0;
        dirAng = currAng;
    }
    else
    {
        deltaAng = currAng - dirAng;
        
        if(deltaAng >= Math.PI)
            deltaAng -= (2*Math.PI);
        if(deltaAng <= -Math.PI)
            deltaAng += (2*Math.PI);
            
        if(!(deltaAng<Math.PI/2 && deltaAng>-Math.PI/2))
        {
            nPoints = cItem.pathPoints.length;
            for(k=0; k<nPoints/2; k++)
            {
                    index1 = k;
                    index2 = nPoints - 1 - k;
                    
                    point1 = cItem.pathPoints[index1];
                    point2 = cItem.pathPoints[index2];
                    
                    tempAnchor = point2.anchor;
                    tempRD= point2.rightDirection;
                    tempLD = point2.leftDirection;
                    tempPointType = point2.pointType;
                    
                    point2.anchor = point1.anchor;
                    point2.rightDirection = point1.leftDirection;
                    point2.leftDirection = point1.rightDirection;
                    point2.pointType = point1.pointType;
                    
                    point1.anchor = tempAnchor;
                    point1.rightDirection = tempLD;
                    point1.leftDirection = tempRD;
                    point1.pointType = tempPointType;
            }
        }
    }
}