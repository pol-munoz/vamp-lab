import React, {memo, useEffect, useRef, useState} from 'react'
import './WaveForm.css'
import WaveSurfer from "wavesurfer.js"

export default memo(function WaveForm(props) {

    const [loading, setLoading] = useState(true)
    const containerRef = useRef()
    const waveSurferRef = useRef()

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            responsive: 50,
            cursorWidth: 0,
            interact: false
        })

        waveSurfer.load('vamp://' + props.track.path)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
            setLoading(false)
        })

        return () =>  waveSurfer.destroy()
    }, [props.track.path])

    useEffect(() => {
        waveSurferRef.current?.drawer.fireEvent('redraw')
    }, [props.duration, loading])

    useEffect(() => {
        if (waveSurferRef.current && waveSurferRef.current.isPlaying() !== props.playing) {
            waveSurferRef.current.playPause()
        }
    }, [props.playing, loading])

    useEffect(() => {
        waveSurferRef.current?.setSinkId(props.track.device)
    }, [props.track.device, loading])

    useEffect(() => {
        if (waveSurferRef.current && waveSurferRef.current.getVolume() !== props.track.volume) {
            waveSurferRef.current.setVolume(props.track.volume)
            if (props.track.volume === 0.0 && !waveSurferRef.current.getMute()) {
                waveSurferRef.current.setMute(true)
            } else if (props.track.volume > 0.0 && waveSurferRef.current.getMute()) {
                waveSurferRef.current.setMute(false)
            }
        }
    }, [props.track.volume, loading])

    let classes = 'WaveForm'

    if (props.className) {
        classes += ` ${props.className}`
    }

    const widthPercentage = (props.track.duration / props.duration) * 100
    return (
        <div className={classes} style={{paddingRight: `${100 - widthPercentage}%`}} onClick={event => {
            const bounds = event.target.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width
            const y = (event.clientY - bounds.top) / bounds.height
            console.log(x, y)
        }}>
            <div ref={containerRef} >
            </div>
            {loading ? <p className="WaveForm-placeholder">Loading...</p> : null}
        </div>
    )
})