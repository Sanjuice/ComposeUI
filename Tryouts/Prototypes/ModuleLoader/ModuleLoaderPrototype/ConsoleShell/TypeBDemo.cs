﻿/// ********************************************************************************************************
///
/// Morgan Stanley makes this available to you under the Apache License, Version 2.0 (the "License").
/// You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
/// See the NOTICE file distributed with this work for additional information regarding copyright ownership.
/// Unless required by applicable law or agreed to in writing, software distributed under the License
/// is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
/// See the License for the specific language governing permissions and limitations under the License.
/// 
/// ********************************************************************************************************

using ModuleLoaderPrototype;

namespace ConsoleShell;

internal class TypeBDemo : IDemo
{
    public async Task RunDemo()
    {
        Console.WriteLine("Restart with module loader? (1 = yes)");
        bool loaderRestart = Console.ReadLine().StartsWith('1');
        const string crashingApp = "crashingapp";
        var loader = new MessageBasedModuleLoader(loaderRestart);
        bool canExit = false;
        int pid;
        loader.LifecycleEvents.Subscribe(e =>
        {
            var unexpected = e.expected ? string.Empty : " unexpectedly";
            Console.WriteLine($"LifecycleEvent detected: {e.pid} {e.eventType}{unexpected}");

            canExit = e.expected && e.eventType == LifecycleEventType.Stopped;

            if (e.eventType == LifecycleEventType.Stopped && !e.expected && !loaderRestart)
            {
                loader.RequestStartProcess(new LaunchRequest() { name = crashingApp, path = @"..\..\..\..\TestApp\bin\Debug\net6.0-windows\TestApp.exe" });
            }
        });
        loader.RequestStartProcess(new LaunchRequest() { name = crashingApp, path = @"..\..\..\..\TestApp\bin\Debug\net6.0-windows\TestApp.exe" });

        Console.ReadLine();

        Console.WriteLine("Exiting subprocesses");

        loader.RequestStopProcess(crashingApp);


        while (!canExit)
        {
            await Task.Delay(TimeSpan.FromMilliseconds(200));
        }

        Console.WriteLine("Bye, ComposeUI!");
    }
}