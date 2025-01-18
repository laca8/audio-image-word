"use client"

import React, { useState, useRef } from 'react'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import mammoth from "mammoth"
import html2canvas from "html2canvas"

const frames = [
    { id: 'simple', name: 'Simple', className: 'border-4 border-gray-300 p-8' },
    // { id: 'elegant', name: 'Elegant', className: 'border-8 border-double border-gray-400 p-8' },
    { id: 'red', name: 'Red', className: 'border-8 border-dashed border-red-400 rounded-lg p-8' },
    { id: 'yellow', name: 'Yellow', className: 'border-8 border-dashed border-yellow-400 rounded-lg p-8' },
    { id: 'green', name: 'Green', className: 'border-8 border-dashed border-green-400 rounded-lg p-8' },
    { id: 'blue', name: 'Blue', className: 'border-8 border-dashed border-blue-400 rounded-lg p-8' },
    { id: 'black', name: 'Black', className: 'border-8 border-dashed border-black-400 rounded-lg p-8' },
    // { id: 'modern', name: 'Modern', className: 'shadow-lg rounded-lg p-8 bg-gradient-to-br from-gray-100 to-gray-200' },
]

export default function WordFileFramer() {
    const [content, setContent] = useState('')
    const [selectedFrame, setSelectedFrame] = useState(frames[0])
    const contentRef = useRef<HTMLDivElement>(null)

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            const arrayBuffer = await file.arrayBuffer()
            console.log(arrayBuffer);

            const result = await mammoth.convertToHtml({ arrayBuffer })
            setContent(result.value)
        }
    }

    const handleFrameChange = (frameId: string) => {
        const frame = frames.find(f => f.id === frameId)
        if (frame) setSelectedFrame(frame)
    }

    const handleDownload = async () => {
        if (contentRef.current) {
            const canvas = await html2canvas(contentRef.current)
            const image = canvas.toDataURL("image/png")
            const link = document.createElement('a')
            link.href = image
            link.download = 'framed-word-page.png'
            link.click()
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <Card className="w-full max-w-3xl">
                <CardHeader>
                    <CardTitle className="text-2xl font-bold">Word File Framer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 ">
                    <div>
                        <Label htmlFor="file-upload">Upload Word File</Label>
                        <Input id="file-upload" type="file" accept=".docx" onChange={handleFileUpload} />
                    </div>
                    <div>
                        <Label htmlFor="frame-select">Select Frame</Label>
                        <Select onValueChange={handleFrameChange}>
                            <SelectTrigger id="frame-select">
                                <SelectValue placeholder="Select a frame" />
                            </SelectTrigger>
                            <SelectContent>
                                {frames.map((frame) => (
                                    <SelectItem key={frame.id} value={frame.id}>{frame.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div ref={contentRef} className={`mt-4 ${selectedFrame.className}`}>
                        <div dangerouslySetInnerHTML={{ __html: content }} />
                    </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                    <Button onClick={handleDownload} disabled={!content}>
                        Download Framed Page
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

