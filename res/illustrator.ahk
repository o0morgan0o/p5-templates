#NoEnv  ; Recommended for performance and compatibility with future AutoHotkey releases.
; #Warn  ; Enable warnings to assist with detecting common errors.
SendMode Input  ; Recommended for new scripts due to its superior speed and reliability.
SetWorkingDir %A_ScriptDir%  ; Ensures a consistent starting directory.



#Numpad6::
#IfWinActive, ahk_class illustrator
	;MsgBox, it's okay
BreakLoop = 0
MsgBox, Ready? don't touch the mouse, we will start. Press Esc to cancel !
SplashTextOn, 200,200, Splash, Script is running ... \n Press Esc to cancel ...
Loop,1000
{
	if (BreakLoop == 1)
		break
	Click
	Sleep, 40
	Send {Del}
	Sleep, 40
}
SplashTextOff
MsgBox, Finished!
BreakLoop = 0
return

Esc::
BreakLoop = 1
return