import React, {memo, useEffect, useRef, useState} from 'react'
import './WaveForm.css'
import WaveSurfer from 'wavesurfer.js'
import RegionsPlugin from 'wavesurfer.js/dist/plugin/wavesurfer.regions.js'
import Button from '../../../../../components/Button/Button'
import Error from '../../../../../../resources/icons/error.svg'
import {
    UPDATE_TRACK_IN_ACTIVE_SONG,
    ADD_VAMP_TO_ACTIVE_SONG,
    DELETE_VAMP_FROM_ACTIVE_SONG,
    UPDATE_VAMP_IN_ACTIVE_SONG
} from '../../ActiveSongReducer'
import Vamp from '../../../../../model/Vamp'

export default memo(function WaveForm(props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const containerRef = useRef()
    const waveSurferRef = useRef()

    const onReselectClick = async () => {
        const track = await window.activeSong.promptUpdateTrack(props.track.id)
        props.dispatch({
            type: UPDATE_TRACK_IN_ACTIVE_SONG,
            payload: {track}
        })
        setError(false)
        setLoading(true)
    }

    useEffect(() => {
        const waveSurfer = WaveSurfer.create({
            container: containerRef.current,
            cursorWidth: 0,
            interact: props.editable,
            partialRender: true,
            fillParent: true,
            responsive: 0,
            minPxPerSec: props.zoom,
            waveColor: '#888',
            progressColor: '#444',
            cursorColor: '#222',
            plugins: [
                RegionsPlugin.create({
                    dragSelection: props.editable
                })
            ]
        })

        waveSurfer.load('vamp://' + props.track.path)
        waveSurfer.on('ready', () => {
            waveSurferRef.current = waveSurfer
            setLoading(false)
        })
        waveSurfer.on('error', () => {
            setLoading(false)
            setError(true)
        })
        waveSurfer.on('seek', progress => {
            props.setLastPos(progress)
        })
        waveSurfer.on('region-updated', region => {
            // TODO Check boundaries?
        })
        waveSurfer.on('region-update-end', region => {
            if (region.id.startsWith('wavesurfer_')) {
                const vamp = new Vamp(region.start, region.end)
                props.dispatch({
                    type: ADD_VAMP_TO_ACTIVE_SONG,
                    payload: {vamp}
                })
            } else {
                const vamp = Vamp.from(region)
                props.dispatch({
                    type: UPDATE_VAMP_IN_ACTIVE_SONG,
                    payload: {vamp}
                })
            }
        })
        waveSurfer.on('region-click', (region, event) => {
            event.stopPropagation()
            const vamp = Vamp.from(region)
            if (props.editable && event.altKey) {
                region.remove()
                props.dispatch({
                    type: DELETE_VAMP_FROM_ACTIVE_SONG,
                    payload: {vamp}
                })
            } else {
                vamp.loop = !vamp.loop
                props.dispatch({
                    type: UPDATE_VAMP_IN_ACTIVE_SONG,
                    payload: {vamp}
                })
            }
        })

        return () => waveSurfer.destroy()
    }, [props.track.path])

    // Play update
    useEffect(() => {
        if (waveSurferRef.current && waveSurferRef.current.isPlaying() !== props.playing) {
            waveSurferRef.current.playPause()
        }
    }, [props.playing, loading])

    // Device update
    useEffect(() => {
        waveSurferRef.current?.setSinkId(props.track.device)
    }, [props.track.device, loading])

    // Volume update
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

    // Vamps update
    useEffect(() => {
        if (waveSurferRef.current) {
            waveSurferRef.current.clearRegions()
            Object.entries(props.vamps).forEach(entry => {
                const [_, vamp] = entry
                waveSurferRef.current.addRegion({
                    ...vamp,
                    drag: props.editable,
                    resize: props.editable,
                    color: vamp.loop ? 'rgba(226, 68, 98, 0.6)' : 'rgba(0, 0, 0, 0.1)',
                })
            })
        }
    }, [props.vamps, loading])

    // Zoom update
    useEffect(() => {
        waveSurferRef.current?.zoom(props.zoom)
        // TODO maybe update based on props.duration to add extra space if needed -> careful not to break stuff
    }, [props.zoom, loading])

    // Position update
    useEffect(() => {
        waveSurferRef.current?.seekAndCenter(props.lastPos)
    }, [props.lastPos, loading])

    let classes = 'WaveForm'

    if (props.className) {
        classes += ` ${props.className}`
    }

    return (
        <div ref={containerRef} className={classes}>
            {loading ? <p className="WaveForm-placeholder">Loading...</p> : null}
            {error ?
                <Button onClick={onReselectClick} className="WaveForm-error" transparent rounded destructive>
                    <div className="Vamp-row">
                        <Error/>
                        <p className="WaveForm-error-text">Couldn't find the track. Click to re-select it.</p>
                    </div>
                </Button>
                : null}
        </div>
    )
})