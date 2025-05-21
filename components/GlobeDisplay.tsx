'use client';
import React, { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';

const storeLocations = [
  {
    lat: 40.7128,
    lng: -74.006,
    name: 'New York',
    size: 7,
    miles: '110 m',
    handoffs: '112',
    avgTime: '112 hr',
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    name: 'London',
    size: 7,
    miles: '110 m',
    handoffs: '112',
    avgTime: '112 hr',
  },
  {
    lat: 35.6895,
    lng: 139.6917,
    name: 'Tokyo',
    size: 7,
    miles: '110 m',
    handoffs: '112',
    avgTime: '112 hr',
  },
  {
    lat: 40.7128,
    lng: -74.006,
    name: 'New York',
    size: 7,
    miles: '110 m',
    handoffs: '112',
    avgTime: '112 hr',
  },
  {
    lat: 51.5074,
    lng: -0.1278,
    name: 'London',
    size: 7,
    miles: '110 m',
    handoffs: '112',
    avgTime: '112 hr',
  },
  {
    lat: 35.6895,
    lng: 139.6917,
    name: 'Tokyo',
    size: 7,
    miles: '110 m',
    handoffs: '112',
    avgTime: '112 hr',
  },
];

const gData = storeLocations.map((item) => ({
  lat: item.lat,
  lng: item.lng,
  name: item.name,
  size: item.size + Math.random() * 30,
  miles: item.miles,
  handoffs: item.handoffs,
  avgTime: item.avgTime,
}));

export const GlobeDisplay: React.FC = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  const globeWraper = `https://media-hosting.imagekit.io/0bdc8d07b4e74a3e/screenshot_1745496558629.png?Expires=1840104560&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=1oy1sUWYwdA83GE2XxplTBQ505DQW2V-4KAVt8IooR-GosMpU6L2GKKG4YVo7DVRgP1gr~t7tw8GmscILcuQDNZsJJ22B-yPBV0lDt7SLNIywDjZY9ibkuc2aGx06jvrKzgURk72PSelcwMIe2m4oGDRLXNv~2pXTeprBFWkSyDttAYlZA6B6lztiDzDo6puL7R-reN~VB-702~cDt9TK46INYcz2QFYnB37TDfRAkvCRP6i5X3crZEvuGjxBxr2AU1kml8EgOdkLyeR3zwx8zQyI-tF~1lIwIhC9qEqx0k0QqhEDEoM04zlTivkSw77TYBCx1RnHrOfejrg4Ktm1Q__`;

  const markerImage =
    'https://media-hosting.imagekit.io/a597dd24eb4844d1/Group%20100.png?Expires=1839689034&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=HnYpD~3t9luYZ0CgbgEQeGHgXnRMayaINy-kP75dGlQ51QPjEFUWVfbGJ1xad2TZbeyndtrqFKOaiiOSFfNd-2GF5BJwOphKRL3HYu7YTmFHj4Nb5QvMgDsHMRqZtcSm9bfiIZmyaDECt~D4t5L9mbLCNTVk86ZEvS7bJGLLYA781fQcgjV7IhSt1rtfPtSlPYq9MlJHXX~85G2AIIRVYsD4fza45LUhfpbw8ymMvfGZJXAc~s48IiBDrlO4c8oabGp6xQdGX4c~~LTv4Xvp4O7s26EyEU6AnWKl~989vK0eSNHJqRW3bTjYblaXyo73aA-YcKoYbfjEQXeVgxuX6g__';

  useEffect(() => {
    if (!globeRef.current) return;

    document.getElementById('globeViz')!.style.backgroundImage =
      'linear-gradient(15deg,rgba(23, 15, 36, 0) 50%, rgba(255, 0, 93, 0) 100%)';

    const createTooltip = (data: {
      miles: string;
      handoffs: string;
      avgTime: string;
    }) => {
      const tooltipWrapper = document.createElement('div');
      tooltipWrapper.style.cssText = `
        position: fixed;
        bottom: 120%;
        left: 50%;
        transform: translateX(-50%);
        background: #170F24;
        color: #fff;
        width: 260px;
        padding: 20px;
        box-shadow: 0 0 12px #FF005D;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s ease;
        font-family: 'Inter', sans-serif;
        font-size: 13px;
        z-index: 10;
      `;

      tooltipWrapper.innerHTML = `
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Total Miles Travelled</span>
          <span>: ${data.miles} mi</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
          <span>Number of Handoffs</span>
          <span>: ${data.handoffs}</span>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span>Average Time per Handoff</span>
          <span>: ${data.avgTime} hr</span>
        </div>
      `;

      return tooltipWrapper;
    };

    const createMarkerElement = (d: any) => {
      console.log('d', d);
      if (!d) {
        console.log('focued pin globe data is missing');
        return;
      }

      let isPinHovered = false;
      let isPinClicked = false;
      let focusedPin: { lat: string; lng: string } | null = null;

      function updateAutoRotate() {
        if (isPinClicked) {
          world.controls().autoRotate = false;
        } else {
          world.controls().autoRotate = !isPinHovered;
        }
      }

      const el = document.createElement('div');
      el.style.cssText = `
        position: relative;
        width: 50px;
        cursor: pointer;
        transition: opacity 250ms;
        pointer-events: auto;
      `;

      const marker = document.createElement('img');
      marker.src = markerImage;
      marker.alt = 'marker';
      marker.style.width = '100%';

      const tooltip = createTooltip(d);

      el.appendChild(marker);
      el.appendChild(tooltip);

      el.addEventListener('mouseenter', () => {
        tooltip.style.opacity = '1';
        tooltip.style.cursor = 'pointer';
        isPinHovered = true;
        updateAutoRotate();
      });

      el.addEventListener('mouseleave', () => {
        tooltip.style.opacity = '0';
        tooltip.style.cursor = 'default';
        isPinHovered = false;
        updateAutoRotate();
      });

      el.addEventListener('click', () => {
        return;
        const isSamePinFocused =
          focusedPin?.lat === d.lat && focusedPin?.lng === d.lng;
        if (isSamePinFocused) {
          focusedPin = null;
          isPinClicked = false;
          world.pointOfView({ lat: d.lat, lng: d.lng, altitude: 4 }, 1000);
        } else {
          focusedPin = { lat: d.lat, lng: d.lng };
          isPinClicked = true;
          world.pointOfView({ lat: d.lat, lng: d.lng, altitude: 0.5 }, 1000);
        }
      });

      return el;
    };

    const world = new Globe(globeRef.current!)
      .globeImageUrl(globeWraper)
      .backgroundColor('rgba(0,0,0,0)')
      .htmlElementsData(gData)
      .htmlElement((d) => createMarkerElement(d) as any)
      .pointLat((d: any) => d.lat)
      .pointLng((d: any) => d.lng)
      .pointsData([]);

    world.controls().autoRotate = true;
    world.controls().autoRotateSpeed = 0.3;
    world.pointOfView({ lat: gData[0].lat, lng: gData[0].lng, altitude: 4 });
    world.globeOffset([0, -100]);

    return () => {
      world.controls().autoRotate = true;
    };
  }, []);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Check if the Ctrl key is pressed
      if (e.ctrlKey) {
        e.preventDefault(); // Prevent the default scroll behavior
        const delta = e.deltaY;

        // Handle zoom based on wheel scroll
        if (delta > 0) {
          // Zoom out
          console.log('Zoom Out');
        } else {
          // Zoom in
          console.log('Zoom In');
        }
      }
    };

    // Attach wheel event listener
    const globeElement = globeRef.current;
    if (globeElement) {
      globeElement.addEventListener('wheel', handleWheel, { passive: false });
    }

    // Clean up event listener on component unmount
    return () => {
      if (globeElement) {
        globeElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  // console.log('globeRef', globeRef)

  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <div
        ref={globeRef}
        id="globeViz"
        className="absolute inset-0 flex justify-center items-center"
      />
    </div>
  );
};

export default GlobeDisplay;
