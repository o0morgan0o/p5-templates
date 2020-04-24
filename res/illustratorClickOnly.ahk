#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.



; vers le bas
#Numpad6::
BreakLoop = 0
MsgBox, Ready? don't touch the mouse, we will start. Press Esc to cancel !
SplashTextOn, 60,60, Splash, Script is running ... \n Press Esc to cancel ...
Loop,1000
{
	if (BreakLoop == 1)
		break
	MouseMove, 0,1, 50, R
	;Sleep, 5
	Click
	Sleep, 5
	Click
	Sleep, 2

}
SplashTextOff
MsgBox, Finished!
BreakLoop = 0
return

Esc::
BreakLoop = 1
return

; vers la droite
#Numpad7::
BreakLoop = 0
MsgBox, Ready? don't touch the mouse, we will start. Press Esc to cancel !
SplashTextOn, 60,60, Splash, Script is running ... \n Press Esc to cancel ...
Loop,1000
{
	if (BreakLoop == 1)
		break
	MouseMove, 1,0, 25, R
	;Sleep, 5
	Click
	Sleep, 5
	Click
	Sleep, 2
	Click
	Sleep, 2
}
SplashTextOff
MsgBox, Finished!
BreakLoop = 0
return

