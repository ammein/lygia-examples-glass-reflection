#version 120

#ifdef GL_ES
precision mediump float;
#endif

uniform sampler2D   u_tex0;

uniform vec2        u_resolution;
uniform vec2        u_mouse;
uniform float       u_time;

#define MIXBOX_LUT u_tex0
// #define MIXBOX_LUT_FLIP_Y

#include "lygia/color/pigments.glsl"
#include "lygia/color/mixOklab.glsl"
#include "lygia/color/mixSpectral.glsl"
#include "lygia/color/mixBox.glsl"

void main(void) {
    vec3 color = vec3(0.0);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    vec3 A = vec3(0.0, 0.07, 0.16);
    // A = PHTHALO_BLUE;
    // A = COBALTE_BLUE;
    // A = ULTRAMARINE_BLUE;
    // A = PHTHALO_GREEN;
    // A = QUINACRIDONE_MAGENTA;

    vec3 B = vec3(0.8431372549, 0.6, 0.0);
    // B = CADMIUM_YELLOW;
    // B = CADMIUM_ORANGE;
    // B = CADMIUM_RED;
    // B = COBALT_VIOLET;

    if (st.y > 0.75) 
        color = mix(A, B, st.x);
    else if (st.y > 0.5)
        color = mixOklab(A, B, st.x);
    else if (st.y > 0.25)
        color = mixSpectral(A, B, st.x);
    else
        color = mixBox(A, B, st.x);

    gl_FragColor = vec4(color, 1.0);
}
