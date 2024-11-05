import { visualSuite, visualTest } from '../visualTest';

visualSuite('Shape drawing', function() {
  for (const mode of ['2D', 'WebGL']) {
    visualSuite(`${mode} mode`, function() {
      const setup = (p5) => {
        p5.createCanvas(50, 50, mode === '2D' ? p5.P2D : p5.WEBGL);
        if (mode !== '2D') {
          p5.translate(-p5.width / 2, -p5.height / 2);
        }
        p5.background(200);
        p5.fill(255);
        p5.stroke(0);
      }

      visualTest('Drawing polylines', function(p5, screenshot) {
        setup(p5);
        p5.beginShape();
        p5.vertex(10, 10);
        p5.vertex(15, 40);
        p5.vertex(40, 35);
        p5.vertex(25, 15);
        p5.vertex(15, 25);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with contours', function(p5, screenshot) {
        setup(p5);

        const vertexCircle = (x, y, r, direction) => {
          for (let i = 0; i <= 12; i++) {
            const angle = p5.map(i, 0, 12, 0, p5.TWO_PI) * direction;
            p5.vertex(x + r * p5.cos(angle), y + r * p5.sin(angle));
          }
        }

        p5.beginShape();
        vertexCircle(15, 15, 10, 1);

        // Inner cutout
        p5.beginContour();
        vertexCircle(15, 15, 5, -1);
        p5.endContour();

        // Outer shape
        p5.beginContour();
        vertexCircle(30, 30, 8, -1);
        p5.endContour();
        p5.endShape();

        screenshot();
      });

      visualTest('Drawing triangle fans', function(p5, screenshot) {
        setup(p5);
        p5.beginShape(p5.TRIANGLE_FAN);
        p5.vertex(25, 25);
        for (let i = 0; i <= 12; i++) {
          const angle = p5.map(i, 0, 12, 0, p5.TWO_PI);
          p5.vertex(25 + 10*p5.cos(angle), 25 + 10*p5.sin(angle));
        }
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing triangle strips', function(p5, screenshot) {
        setup(p5);
        p5.beginShape(p5.TRIANGLE_STRIP);
        p5.vertex(10, 10);
        p5.vertex(30, 10);
        p5.vertex(15, 20);
        p5.vertex(35, 20);
        p5.vertex(10, 40);
        p5.vertex(30, 40);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing quad strips', function(p5, screenshot) {
        setup(p5);
        p5.beginShape(p5.QUAD_STRIP);
        p5.vertex(10, 10);
        p5.vertex(30, 10);
        p5.vertex(15, 20);
        p5.vertex(35, 20);
        p5.vertex(10, 40);
        p5.vertex(30, 40);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing closed polylines', function(p5, screenshot) {
        setup(p5);
        p5.beginShape();
        p5.vertex(10, 10);
        p5.vertex(15, 40);
        p5.vertex(40, 35);
        p5.vertex(25, 15);
        p5.vertex(15, 25);
        p5.endShape(p5.CLOSE);
        screenshot();
      });

      visualTest('Drawing with curves', function(p5, screenshot) {
        setup(p5);
        p5.beginShape();
        p5.curveVertex(10, 10);
        p5.curveVertex(10, 10);
        p5.curveVertex(15, 40);
        p5.curveVertex(40, 35);
        p5.curveVertex(25, 15);
        p5.curveVertex(15, 25);
        p5.curveVertex(15, 25);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with curves with tightness', function(p5, screenshot) {
        setup(p5);
        p5.curveTightness(0.5);
        p5.beginShape();
        p5.curveVertex(10, 10);
        p5.curveVertex(10, 10);
        p5.curveVertex(15, 40);
        p5.curveVertex(40, 35);
        p5.curveVertex(25, 15);
        p5.curveVertex(15, 25);
        p5.curveVertex(15, 25);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing closed curve loops', function(p5, screenshot) {
        setup(p5);
        p5.beginShape();
        p5.curveVertex(10, 10);
        p5.curveVertex(15, 40);
        p5.curveVertex(40, 35);
        p5.curveVertex(25, 15);
        p5.curveVertex(15, 25);
        // Repeat first 3 points
        p5.curveVertex(10, 10);
        p5.curveVertex(15, 40);
        p5.curveVertex(40, 35);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with cubic beziers', function(p5, screenshot) {
        setup(p5);
        p5.beginShape();
        p5.vertex(10, 10);
        p5.bezierVertex(10, 10, 15, 40, 40, 35);
        p5.bezierVertex(25, 15, 15, 25, 15, 25);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with quadratic beziers', function(p5, screenshot) {
        setup(p5);
        p5.beginShape();
        p5.vertex(10, 10);
        p5.quadraticVertex(10, 10, 15, 40);
        p5.quadraticVertex(40, 35, 25, 15);
        p5.quadraticVertex(15, 25, 10, 10);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with points', function(p5, screenshot) {
        setup(p5);
        p5.strokeWeight(5);
        p5.beginShape(p5.POINTS);
        p5.vertex(10, 10);
        p5.vertex(15, 40);
        p5.vertex(40, 35);
        p5.vertex(25, 15);
        p5.vertex(15, 25);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with lines', function(p5, screenshot) {
        setup(p5);
        p5.beginShape(p5.LINES);
        p5.vertex(10, 10);
        p5.vertex(15, 40);
        p5.vertex(40, 35);
        p5.vertex(25, 15);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with triangles', function(p5, screenshot) {
        setup(p5);
        p5.beginShape(p5.TRIANGLES);
        p5.vertex(10, 10);
        p5.vertex(15, 40);
        p5.vertex(40, 35);
        p5.vertex(25, 15);
        p5.vertex(15, 25);
        p5.vertex(10, 10);
        p5.endShape();
        screenshot();
      });

      visualTest('Drawing with quads', function(p5, screenshot) {
        setup(p5);
        p5.beginShape(p5.QUADS);
        p5.vertex(10, 10);
        p5.vertex(15, 10);
        p5.vertex(15, 15);
        p5.vertex(10, 15);
        p5.vertex(25, 25);
        p5.vertex(30, 25);
        p5.vertex(30, 30);
        p5.vertex(25, 30);
        p5.endShape();
        screenshot();
      });

      if (mode === 'WebGL') {
        visualTest('3D vertex coordinates', function(p5, screenshot) {
          setup(p5);

          p5.beginShape(p5.QUAD_STRIP);
          p5.vertex(10, 10, 0);
          p5.vertex(10, 40, -150);
          p5.vertex(40, 10, 150);
          p5.vertex(40, 40, 200);
          p5.endShape();

          screenshot();
        });

        visualTest('3D quadratic coordinates', function(p5, screenshot) {
          setup(p5);

          p5.beginShape();
          p5.vertex(10, 10, 0);
          p5.vertex(10, 40, -150);
          p5.quadraticVertex(40, 40, 200, 40, 10, 150);
          p5.endShape(p5.CLOSE);

          screenshot();
        });

        visualTest('3D cubic coordinates', function(p5, screenshot) {
          setup(p5);

          p5.beginShape();
          p5.vertex(10, 10, 0);
          p5.vertex(10, 40, -150);
          p5.bezierVertex(40, 40, 200, 40, 10, 150, 10, 10, 0);
          p5.endShape();

          screenshot();
        });

        visualTest('Texture coordinates', async function(p5, screenshot) {
          const tex = await p5.loadImage('/unit/assets/cat.jpg');
          setup(p5);
          p5.texture(tex);
          p5.beginShape(p5.QUAD_STRIP);
          p5.vertex(10, 10, 0, 0, 0);
          p5.vertex(45, 5, 0, tex.width, 0);
          p5.vertex(15, 35, 0, 0, tex.height);
          p5.vertex(40, 45, 0, tex.width, tex.height);
          p5.endShape();

          screenshot();
        });

        visualTest('Normalized texture coordinates', async function(p5, screenshot) {
          const tex = await p5.loadImage('/unit/assets/cat.jpg');
          setup(p5);
          p5.texture(tex);
          p5.textureMode(p5.NORMAL);
          p5.beginShape(p5.QUAD_STRIP);
          p5.vertex(10, 10, 0, 0, 0);
          p5.vertex(45, 5, 0, 1, 0);
          p5.vertex(15, 35, 0, 0, 1);
          p5.vertex(40, 45, 0, 1, 1);
          p5.endShape();

          screenshot();
        });

        visualTest('Per-vertex fills', async function(p5, screenshot) {
          setup(p5);
          p5.beginShape(p5.QUAD_STRIP);
          p5.fill(0);
          p5.vertex(10, 10);
          p5.fill(255, 0, 0);
          p5.vertex(45, 5);
          p5.fill(0, 255, 0);
          p5.vertex(15, 35);
          p5.fill(255, 255, 0);
          p5.vertex(40, 45);
          p5.endShape();

          screenshot();
        });

        visualTest('Per-vertex strokes', async function(p5, screenshot) {
          setup(p5);
          p5.strokeWeight(5);
          p5.beginShape(p5.QUAD_STRIP);
          p5.stroke(0);
          p5.vertex(10, 10);
          p5.stroke(255, 0, 0);
          p5.vertex(45, 5);
          p5.stroke(0, 255, 0);
          p5.vertex(15, 35);
          p5.stroke(255, 255, 0);
          p5.vertex(40, 45);
          p5.endShape();

          screenshot();
        });

        visualTest('Per-vertex normals', async function(p5, screenshot) {
          setup(p5);
          p5.normalMaterial();
          p5.beginShape(p5.QUAD_STRIP);
          p5.normal(-1, -1, 1);
          p5.vertex(10, 10);
          p5.normal(1, -1, 1);
          p5.vertex(45, 5);
          p5.normal(-1, 1, 1);
          p5.vertex(15, 35);
          p5.normal(1, 1, 1);
          p5.vertex(40, 45);
          p5.endShape();

          screenshot();
        });
      }
    });
  }
});
